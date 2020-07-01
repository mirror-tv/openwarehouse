/** @jsx jsx */
import { jsx } from '@emotion/core';
import { YouTube, EmbedCode, BlockQuote, Image, Slideshow, Video } from './editor/controls';

export const customButtons = [
    <YouTube />,
    <EmbedCode />,
    <BlockQuote />,
    <Image />,
    <Slideshow />,
    <Video />,
];

export const builtInButtons = {
    options: [
        "inline",
        "blockType",
        "list",
        "link",
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
            "Blockquote",
        ],
    },
    list: {
        options: ["unordered", "ordered"],
    },
};