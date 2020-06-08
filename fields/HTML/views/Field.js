/** @jsx jsx */

import { Global, css, jsx } from '@emotion/core';

import { FieldContainer, FieldLabel } from '@arch-ui/fields';

// MUST IMPORT for TinyMCE to work!
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

//import { Editor } from '@tinymce/tinymce-react';

import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const defaultOptions = {
    autoresize_bottom_margin: 20,
    base_url: '/tinymce-assets',
    branding: false,
    menubar: false,
    plugins: 'link lists code autoresize paste quickbars hr table emoticons image',
    statusbar: false,
    toolbar:
        'formatselect forecolor | alignleft aligncenter alignright alignjustify | bullist numlist indent outdent | link unlink | image table emoticons hr | code',
    quickbars_selection_toolbar:
        'bold italic underline strikethrough | h1 h2 h3 | quicklink blockquote removeformat',
    quickbars_insert_toolbar: false,
    width: '100%',
};

// Overrides some of the TinyMCE theme to better match the Admin UI style
const GlobalStyles = () => (
    <Global
        styles={css`
      .tox-tinymce {
        border-radius: 5px !important;
        border-color: #c1c7d0 !important;
      }
    `}
    />
);

const HTMLField = ({ onChange, autoFocus, field, errors, value = '', isDisabled }) => {
    const handleChange = value => {
        if (typeof value === 'string') {
            onChange(value);
        }
    };

    const htmlID = `ks-input-${field.path}`;
    const accessError = errors.find(
        error => error instanceof Error && error.name === 'AccessDeniedError'
    );

    if (accessError) return null;

    const overrideOptions = field.config.editorConfig;

    return (
        <FieldContainer>
            <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
            <div css={{ display: 'flex', flex: 1 }}>
                <GlobalStyles />
                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
            </div>
        </FieldContainer>
    );
};

export default HTMLField;
