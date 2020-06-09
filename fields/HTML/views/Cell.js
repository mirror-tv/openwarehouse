/** @jsx jsx */
import { jsx } from '@emotion/core';
import { fetchData } from './dataHandler';

export default function HtmlCell({ data }) {
    return JSON.stringify(fetchData(data));
}
