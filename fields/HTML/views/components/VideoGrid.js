'use strict';
import { Video } from 'plate-model/dist/components/article/index';
import _ from 'lodash';
import React from 'react';

class VideoItem extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			playing: false,
			loaded: false,
		};
	}

	componentWillUnmount () {}

	_handleSelect (e) {
		e.stopPropagation();
		this.props.onSelect(e);
	}

	render () {
		const { video, coverPhoto, isSelected, title, description, width } = this.props;

		let style = {
			border: isSelected ? '1px solid' : '',
			boxSizing: 'border-box',
			display: 'inline-block',
			padding: '10px',
			width: `${width}%`,
		};
		return (
			<div onClick={this._handleSelect.bind(this)} style={style}>
				<Video
					content={[{
						url: video,
						coverPhoto,
						title,
						description,
					}]}
				/>
			</div>
		);
	}
}

VideoItem.propTypes = {
	video: React.PropTypes.string,
	coverPhoto: React.PropTypes.object,
	description: React.PropTypes.string,
	doShowRemove: React.PropTypes.bool,
	isSelected: React.PropTypes.bool,
	onRemove: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	title: React.PropTypes.string,
	width: React.PropTypes.number.isRequired,
};

VideoItem.defaultProps = {
	video: '',
	coverPhoto: null,
	description: '',
	doShowRemove: false,
	isSelected: false,
	title: '',
	width: 100,
};

class VideoGrid extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			videos: props.videos,
			selectedVideos: props.selectedVideos,
		};
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			videos: nextProps.videos,
			selectedVideos: nextProps.selectedVideos,
		});
	}
	_handleSelect (video) {
		this.props.onSelect(video);
	}

	render () {
		const { videos, selectedVideos } = this.state;
		const { columns } = this.props;
		const width = Math.floor(100 / columns);
		const videoItems = videos.map((video, index) => {
			const isSelected = selectedVideos.find((element) => {
				return element.id === video.id;
			}) ? true : false;
			return (
				<VideoItem
					video={_.get(video, 'url')}
					coverPhoto={_.get(video, 'coverPhoto')}
					description={_.get(video, 'description')}
					isSelected={isSelected}
					key={video.id}
					onSelect={this._handleSelect.bind(this, video)}
					title={_.get(video, 'title')}
					width={width}
				/>
			);
		});

		return (
			<div className="videoGrid">
				{videoItems}
			</div>
		);
	}
}

VideoGrid.propTypes = {
	videos: React.PropTypes.array.isRequired,
	columns: React.PropTypes.number,
	onSelect: React.PropTypes.func,
	padding: React.PropTypes.number,
	selectedVideos: React.PropTypes.array,
};

VideoGrid.defaultProps = {
	videos: [],
	columns: 3,
	padding: 10,
	selectedVideos: [],
};

export { VideoGrid, VideoItem };
