import FieldController from '@keystonejs/fields/Controller';
import { convertToEditorState, fetchData } from './dataConverter';

class HtmlController extends FieldController {
    constructor(config, ...args) {
        super(config, ...args);
    }

    serialize = data => {
        return data[this.path] ? JSON.stringify(fetchData(data[this.path])) : undefined;
    };

    deserialize = data => {
        return convertToEditorState(data[this.path] ? JSON.parse(data[this.path]) : null);
    };

    getFilterTypes = () => [];
}

export default HtmlController;
