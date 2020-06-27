import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { EditorState } from 'draft-js';
// FIXME customize mini editor
import { builtInButtons } from '../../../customToolbar';
import classNames from 'classnames';

// TODO Improve css
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MiniEditor = (props) => {

    // Deconstructs props
    const {
        config: {
            style,
            className,
            title,
        },
        getPreSelectedText, // () => string
        onSave, // (text, ContentState) => {...}
    } = props;

    // Use states
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const [editorState, setEditor] = useState(EditorState.createEmpty());

    // States cleaners
    const clearEditor = () => setEditor(EditorState.createEmpty());;
    const clearText = () => setText("");;
    const statesCleaners = [clearEditor, clearText];
    const clear = () => {
        statesCleaners.map(fn => fn());
    };

    // Helper funtions
    const doCollapse = () => {
        setExpanded(false);
        clear();
    };
    const doExpand = () => setExpanded(true);;
    const save = () => {
        onSave(text, editorState.getCurrentContent());
        doCollapse();
    };

    // Event handlers
    const onEditorStateChange = (state) => setEditor(state);;
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    // Fill-in pre-selected text if text state is empty
    if (text == "" && getPreSelectedText() != "") {
        setText(getPreSelectedText());
    }

    return (
        <div
            className={classNames('rdw-link-wrapper', className)}
            aria-label="rdw-link-control"
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={classNames(style.className)}
                aria-haspopup="true"
                aria-expanded={expanded}
                onClick={doExpand}
                title={style.title}
            />
            <Dialog
                open={expanded}
                onClose={doCollapse}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title.text}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required={true}
                        margin="dense"
                        id="title"
                        label="Text"
                        type="text"
                        fullWidth
                        placeholder="Enter Text" name="form-input-text"
                        onChange={handleTextChange}
                        value={text} />
                    <Editor
                        initialEditorState={editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        // FIXME use its own
                        toolbar={builtInButtons}
                        onEditorStateChange={onEditorStateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={save} >
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={doCollapse}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MiniEditor;
