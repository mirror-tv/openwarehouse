'use strict';
import _ from 'lodash';
import EntityEditingBlockMixin from '../mixins/entity-editing-block-mixin';
import React from 'react';

class LinkEditingBlock extends EntityEditingBlockMixin(React.Component) {

	constructor (props) {
		super(props);
		this.state.editingFields = {
			text: props.text,
			url: props.url,
		};
	}

	// overwrite
	_composeEditingFields (props) {
		return {
			text: {
				type: 'text',
				value: props.text,
			},
			url: {
				type: 'text',
				value: props.url,
			},
		};
	}

	// overwrite
	_decomposeEditingFields (fields) {
		return {
			text: fields.text.value,
			url: fields.url.value,
		};
	}

  // overwrite
  _handleSave () {
    const url = _.trimStart(_.get(this._editingFields, [ 'url', 'value' ]));
    if (!url || (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0 && url.indexOf('mailto:') !== 0)) {
      this.setState({
        urlMsg: { warning: [ 'The url must start with \"http://\", \"https://\" or \"mailto:\".' ] }
      })
    } else {
      this.setState({
        editingFields: this._editingFields,
        urlMsg: {},
      }, () => {
        this.props.toggleModal();
        this.props.onToggle(this._decomposeEditingFields(this._editingFields));
      });
    }
  }
}

LinkEditingBlock.displayName = 'LinkEditingBlock';

LinkEditingBlock.propTypes = {
	isModalOpen: React.PropTypes.bool,
	onToggle: React.PropTypes.func.isRequired,
	text: React.PropTypes.string,
	toggleModal: React.PropTypes.func,
	url: React.PropTypes.string,
};

LinkEditingBlock.defaultProps = {
	isModalOpen: false,
	text: '',
	url: '',
};

export default LinkEditingBlock;
