// import { convertEditorStateToDbData } from './dataConverter';
import {
    createEditorStateFromRaw,
    serialiseEditorStateToRaw,
} from 'draftjs-conductor'

export default function HtmlCell({ data }) {
    if (data && Date.parse(data)) {
        return new Date(data).toLocaleString()
    } else return data
}
