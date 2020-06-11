'use strict';
import { Video } from 'plate-model/dist/components/article/index';
import AtomicBlockRendererMixin from '../mixins/atomic-block-renderer-mixin';
import React from 'react';

export default class VideoBlock extends AtomicBlockRendererMixin(React.Component) {
	constructor (props) {
		super(props);
	}

	render () {
		if (!this.state.data) {
			return null;
		}

		return (
			<div
				contentEditable={false}
			>
				<Video
					{...this.state.data}
					device={this.props.device}
				/>
			</div>
		);
	}
};
