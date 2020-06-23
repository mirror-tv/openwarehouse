import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { getEntityRange, getSelectionEntity } from 'draftjs-utils';

import GridSelector from '../../components/GridSelector'
import dummy from './dummy';

const maxImageNumberPerPage = 12;

const Image = (props) => {
    const { onChange, editorState } = props;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagedData, setPagedData] = useState([]);

    useEffect(() => {
        function getTotal() {
            return Math.ceil(dummy.length / maxImageNumberPerPage);
        }

        setTotal(getTotal());
    })

    useEffect(() => {
        function getPagedData() {
            const offset = (page - 1) * maxImageNumberPerPage;
            return dummy.slice(offset, offset + maxImageNumberPerPage);
        }

        setPagedData(getPagedData());
    }, [page])

    const saveImage = selectedData => {
        const currentEntity = getSelectionEntity(editorState);
        let selection = editorState.getSelection();

        if (currentEntity) {
            const entityRange = getEntityRange(editorState, currentEntity);
            const isBackward = selection.getIsBackward();
            if (isBackward) {
                selection = selection.merge({
                    anchorOffset: entityRange.end,
                    focusOffset: entityRange.start,
                });
            } else {
                selection = selection.merge({
                    anchorOffset: entityRange.start,
                    focusOffset: entityRange.end,
                });
            }
        }

        let contentState = editorState.getCurrentContent();
        contentState = Modifier.splitBlock(contentState, selection);
        contentState = contentState.createEntity('IMAGE', 'IMMUTABLE', {
            title: 'dummy_title',
            url: 'dummy_url',
        });
        const entityKey = contentState.getLastCreatedEntityKey();

        contentState = Modifier.replaceText(
            contentState,
            selection,
            ' ',
            undefined,
            entityKey
        );

        const newEditorState = EditorState.push(
            editorState,
            contentState,
            'insert-characters'
        );

        onChange(newEditorState);
    }

    const ImageTile = props => {
        const { id, data } = props;
        return (
            <img
                id={id}
                src={data.url}
                alt={data.title}
                style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                    zIndex: -3,
                }}
            />
        );
    };

    const ImageEditingTile = props => {
        const { data } = props;
        return (
            <img
                src={data.url}
                alt={data.title}
                style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                }}
            />
        );
    };

    return (
        <GridSelector
            total={total}
            page={page}
            pagedData={pagedData}
            onPageChange={setPage}
            onChange={saveImage}
            TileComponent={ImageTile}
            EditingTileComponent={ImageEditingTile}
        />
    );
}

export default Image;
