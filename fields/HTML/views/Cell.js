import { fetchData } from './dataConverter';

export default function HtmlCell({ data }) {
    return JSON.stringify(fetchData(data));
}
