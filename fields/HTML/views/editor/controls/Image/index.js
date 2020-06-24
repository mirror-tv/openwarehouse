import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { getEntityRange, getSelectionEntity } from 'draftjs-utils';
import { createApolloFetch } from 'apollo-fetch';

import GridSelector from '../../components/GridSelector'
import dummy from './dummy';

const maxImageNumberPerPage = 12;

const fetch = createApolloFetch({
    uri: '/admin/api',
});

const Image = (props) => {
    const { onChange, editorState } = props;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagedData, setPagedData] = useState([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        (async () => {
            const { data: { _allImagesMeta: { count } } } = await fetch({
                query: `
                query {
                    _allImagesMeta {
                      count
                    }
                }`,
            });
            setTotal(Math.ceil(count / maxImageNumberPerPage));
        })();
    })

    useEffect(() => {
        /* function getPagedData() {
            const offset = (page - 1) * maxImageNumberPerPage;
            return dummy.slice(offset, offset + maxImageNumberPerPage);
        } */

        (async () => {
            const { data: { allImages } } = await fetch({
                query: `
                query getImages($search: String!, $skip: Int!, $first: Int!) {
                    allImages(search: $search, skip: $skip, first: $first) {
                      id
                      title
                      urlDesktopSized
                    }
                }`,
                variables: {
                    search: searchText,
                    skip: (page - 1) * maxImageNumberPerPage,
                    first: maxImageNumberPerPage,
                },
            });
            setPagedData(allImages);
        })();
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
                src={data.urlDesktopSized}
                alt={data.title}
                style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                }}
            />
        );
    };

    const ImageEditingTile = props => {
        const { data } = props;
        return (
            <img
                src={data.urlDesktopSized}
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
            searchText={searchText}
            onPageChange={setPage}
            onSearchTextChange={setSearchText}
            onChange={saveImage}
            TileComponent={ImageTile}
            EditingTileComponent={ImageEditingTile}
        />
    );
}

Image.propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
}

export default Image;
