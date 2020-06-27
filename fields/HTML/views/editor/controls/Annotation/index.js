import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { getSelectedBlock } from "draftjs-utils";


import MiniEditor from '../../components/MiniEditor';
import '../../css/main.css';

const Annotation = (props) => {

    const { editorState } = props;

    const getPreSelectedText = () => getSelectedBlock(editorState).getText();;
    // TODO customDecorators
    const onSave = (text, contentState) => console.log("onSave:", text, draftToHtml(convertToRaw(contentState)));;

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

export default Annotation;
