'use strict';
import EntityEditingBlockMixin from '../mixins/entity-editing-block-mixin';
import React from 'react';
import PropTypes from 'prop-types';

class YoutubeEditingBlock extends EntityEditingBlockMixin(React.Component) {
	constructor(props) {
		super(props);
		this.state.editingFields = {
			youtubeId: props.youtubeId,
			description: props.description,
		};
	}

	// overwrite
	_composeEditingFields(props) {
		return {
			youtubeId: {
				type: 'text',
				value: props.youtubeId,
			},
			description: {
				type: 'textarea',
				value: props.description,
			},
		};
	}

	// overwrite
	_decomposeEditingFields(fields) {
		return {
			youtubeId: fields.youtubeId.value,
			description: fields.description.value,
		};
	}
}

YoutubeEditingBlock.displayName = 'YoutubeEditingBlock';

YoutubeEditingBlock.propTypes = {
	description: PropTypes.string,
	isOpen: PropTypes.bool,
	onToggle: PropTypes.func.isRequired,
	toggleModal: PropTypes.func,
	youtubeId: PropTypes.string,
};

YoutubeEditingBlock.defaultProps = {
	description: '',
	isOpen: false,
	youtubeId: '',
};

export default YoutubeEditingBlock;
