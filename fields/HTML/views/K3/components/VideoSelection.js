'use strict';
import _ from 'lodash';
import { VideoGrid } from './VideoGrid';
import SelectionMixin from './mixins/SelectionMixin';
import React, { Component } from 'react';

class VideoSelection extends SelectionMixin(Component) {
	constructor (props) {
		super(props);

		this.state = {
			items: props.videos,
			selectedItems: props.selectedVideos,
		};
	}

	componentWillReceiveProps (nextProps) {
		let props = {};
		_.merge(props, {
			items: nextProps.videos,
			selectedItems: nextProps.selectedVideos,
		});
		super.componentWillReceiveProps(props);
	}

	render () {
		return (
			<VideoGrid
				videos={this.state.items}
				onSelect={this.handleSelect}
				selectedVideos={this.state.selectedItems}
			/>
		);
	}
};

VideoSelection.propTypes = {
	videos: React.PropTypes.array,
	selectedVideos: React.PropTypes.array,
	selectionLimit: React.PropTypes.number,
	updateSelection: React.PropTypes.func.isRequired,
};

VideoSelection.defaultProps = {
	videos: [],
	selectedVideos: [],
	selectionLimit: 1,
};

module.exports = VideoSelection;
