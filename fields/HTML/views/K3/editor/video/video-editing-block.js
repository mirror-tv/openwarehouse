'use strict';
import VideoSelector from '../../components/VideoSelector';
import React, { Component } from 'react';

class VideoEditingBlock extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { apiPath, onToggle, toggleModal, selectionLimit, isModalOpen } = this.props;
		return (
			<VideoSelector
				apiPath={apiPath}
				isSelectionOpen={isModalOpen}
				onChange={onToggle}
				onFinish={toggleModal}
				selectionLimit={selectionLimit}
			/>
		);
	}

}

VideoEditingBlock.propTypes = {
	apiPath: React.PropTypes.string,
	isModalOpen: React.PropTypes.bool,
	onToggle: React.PropTypes.func,
	selectedVideos: React.PropTypes.array,
	selectionLimit: React.PropTypes.number,
	toggleModal: React.PropTypes.func,
};

VideoEditingBlock.defaultProps = {
	apiPath: 'videos',
	isModalOpen: false,
	selectedVideos: [],
	selectionLimit: 1,
};

export default VideoEditingBlock;
