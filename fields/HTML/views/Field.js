/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FieldContainer } from '@arch-ui/fields';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const HtmlField = ({ onChange, autoFocus, field, value, errors }) => {
    const editorState = value ? value : EditorState.createEmpty();

    return (
        <FieldContainer >
            <Editor
                editorState={editorState}
                onEditorStateChange={onChange}
            />
        </FieldContainer>
    );
};

export default HtmlField;
