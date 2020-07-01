import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { getSelectedBlock, getSelectionEntity, getEntityRange } from "draftjs-utils";


import MiniEditor from '../../components/MiniEditor';
import '../../css/main.css';

export const AnnotationType = "ANNOTATION";
export default (props) => {
    const { editorState, onChange } = props;

    const generateContentBlock = () => {
        const selectedType = getSelectedBlocksType(editorState);

        switch (selectedType) {
            case AnnotationType:
            // extract text and content block
            default:
            // use as text and generate a content block
        }
    }

    const getPreSelectedText = () => getSelectedBlock(editorState).getText();;
    // TODO customDecorators

    const onSave = (text, contentState) => {
        const currentEntity = editorState ? getSelectionEntity(editorState) : undefined;

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
        let currentContentState = editorState.getCurrentContent();
        currentContentState = Modifier.splitBlock(currentContentState, selection);
        currentContentState = currentContentState.createEntity(AnnotationType, 'IMMUTABLE', {
            pureAnnotationText: text,
            annotation: draftToHtml(convertToRaw(contentState)),
        });
        const entityKey = currentContentState.getLastCreatedEntityKey();

        currentContentState = Modifier.replaceText(
            currentContentState,
            selection,
            ' ',
            undefined,
            entityKey
        );

        const newEditorState = EditorState.push(
            editorState,
            currentContentState,
            'insert-characters'
        );

        onChange(newEditorState);
    };

    return (
        <MiniEditor
            config={prepareLayoutConfig()}
            getPreSelectedText={getPreSelectedText}
            onSave={onSave}
        />
    )

}

const prepareLayoutConfig = () => ({
    style: {
        icon: undefined,
        className: 'fa fa-code',
        title: "Annotation"
    },
    title: {
        text: "Annotation",
    },
    isRequired: {
        first: true,
        last: true
    }
});
