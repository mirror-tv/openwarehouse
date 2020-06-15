/** @jsx jsx */
import { jsx } from '@emotion/core';
import { YouTube } from './controls';

export const customButtons = [
    <YouTube />
];

export const builtInButtons = {
    options: [
        "inline",
        "blockType",
        "fontSize",
        "list",
        "link",
        "embedded",
        "image",
        "history",
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
            "Normal",
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "Blockquote",
        ],
    },
    list: {
        options: ["unordered", "ordered"],
    },
};