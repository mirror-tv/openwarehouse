/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FieldContainer } from '@arch-ui/fields';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { handleDraftEditorPastedText } from "draftjs-conductor";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const HtmlField = ({ onChange, autoFocus, field, value, errors }) => {
    const editorState = value ? value : EditorState.createEmpty();

    return (
        <FieldContainer >
            <Editor
                editorState={editorState}
                onEditorStateChange={onChange}
                handlePastedText={handlePastedText}
            />
        </FieldContainer>
    );
};

const handlePastedText = (text, html, editorState, onChange) => {
    if (html) {
        let newState = handleDraftEditorPastedText(html, editorState);
        if (newState) {
            onChange(newState);

            return true;
        }
    }

    return false;
}

export default HtmlField;
