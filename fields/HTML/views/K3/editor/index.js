/** @jsx jsx */
import { jsx } from '@emotion/core';
import { EntityButtons } from './editor-buttons';

export const YoutubeLink = (
    <EntityButtons entities={['YOUTUBE']} onToggle={f => f} />
);