import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import classNames from 'classnames';
import Option from '../Option';

// TODO Improve css
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const builtInButtons = {
    options: [
        "blockType",
        "inline",
        "list",
        "link",
    ],
    inline: {
        options: [
            "bold",
            "italic",
            "underline",
        ],
    },
    blockType: {
        inDropdown: false,
        options: [
            "H2",
        ],
    },
    list: {
        options: ["unordered", "ordered"],
    },
};

const MiniEditor = (props) => {

    // Deconstructs props
    const {
        config: {
            style,
            className,
            title,
        },
        getPreSelectedText, // () => string
        onSave, // (text, html) => {...}
    } = props;

    // Use states
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const [editorState, setEditor] = useState(EditorState.createEmpty());

    // States cleaners
    const statesCleaners = [
        () => setEditor(EditorState.createEmpty()),
        () => setText(""),
        () => setExpanded(false),
    ];
    const clear = () => {
        statesCleaners.map(fn => fn());
    };

    // Bussiness Logic Funtions
    const doCollapse = () => {
        clear();
    };
    const doExpand = () => {
        // HACK workaround
        document.activeElement.blur();
        setExpanded(true);
    };

    // Event handlers
    const handleSave = () => {
        onSave(text, draftToHtml(convertToRaw(editorState.getCurrentContent())));
        doCollapse();
    };
    const handleCancel = () => {
        doCollapse();
    };
    const onEditorStateChange = (state) => setEditor(state);;
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    // Fill-in pre-selected text if text state is empty, and it's just expanded
    useEffect(() => {
        if (expanded && !text && getPreSelectedText()) {
            setText(getPreSelectedText());
        }
    }, [expanded])

    return (
        <div
            className={classNames('rdw-link-wrapper', className)}
            aria-label="rdw-link-control"
        >
            <Option
                value="unordered-list-item"
                className={classNames(style.className)}
                onClick={doExpand}
                aria-haspopup="true"
                aria-expanded={expanded}
                title={style.title}
            >
                <img src={style.icon} alt="" />
            </Option>
            <Dialog
                open={expanded}
                onClose={doCollapse}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title.text}</DialogTitle>
                <DialogContent>
                    <TextField
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
                        editorState={editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        // FIXME use its own
                        toolbar={builtInButtons}
                        onEditorStateChange={onEditorStateChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSave} >
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MiniEditor;
