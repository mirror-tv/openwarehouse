'use strict';
import { Button, Modal, Pagination } from 'elemental';
import { parseVideoAPIResponse, parseImageAPIResponse } from '../../../lib/parseAPIResponse';
import _ from 'lodash';
import qs from 'qs';
import React from 'react';
import SelectorMixin from './mixins/SelectorMixin';
import VideoSelection from './VideoSelection';
import xhr from 'xhr';

const PAGINATION_LIMIT = 10;

class VideoSelector extends SelectorMixin(React.Component) {
	constructor (props) {
		super(props);
		this.state.selectedItems = props.selectedVideos;
	}

 	componentWillReceiveProps (nextProps) {
		let props = {};
		_.merge(props, nextProps, { selectedItems: nextProps.selectedVideos });
		super.componentWillReceiveProps(props);
	}

	_loadImage (imageId) {
		return new Promise((resolve, reject) => {
			if (!imageId) {
				return reject(new Error('Should provide imageId'));
			}
			xhr({
				url: Keystone.adminPath + this.API + 'images/' + imageId,
				responseType: 'json',
			}, (err, resp, data) => {
				if (err) {
					return reject(err);
				}
				resolve(parseImageAPIResponse(data));
			});
		});
	}

	_loadCoverPhotoForVideo (video) {
		return new Promise((resolve, reject) => {
			let imageId = _.get(video, ['fields', 'coverPhoto']);
			this._loadImage(imageId)
				.then((image) => {
					_.set(video, ['fields', 'coverPhoto'], image);
					resolve(parseVideoAPIResponse(video));
				}, (err) => {
					resolve(parseVideoAPIResponse(video));
				});
		});
	}

	_loadCoverPhotoForVideos (videos) {
		return new Promise((resolve, reject) => {
			let promises = [];
			_.forEach(videos, (video) => {
				promises.push(this._loadCoverPhotoForVideo(video));
			});
			Promise.all(promises)
				.then((videos) => {
					resolve(videos);
				}, (err) => {
					reject(err);
				});
		});
	}

	loadItems (querystring = '') {
		return new Promise((resolve, reject) => {
			super.loadItems(querystring)
				.then((videos) => {
					this._loadCoverPhotoForVideos(videos)
						.then((videos) => {
							resolve(videos);
						});
				}).catch((err) => reject(err));
		});
	}

	/** build query string filtered by title for keystone api
	 * @override
	 * @param {string[]} [filters=[]] - keywords for filtering
	 * @param {number} [page=0] - Page we used to calculate how many items we want to skip
	 * @param {limit} [limit=10] - The number of items we want to get
	 * @return {string} a query string
	 */
	_buildFilters (filters = [], page = 0, limit = 10) {
		let filterQuery = {
			title: {
				value: filters,
			},
		};
		let queryString = {
			filters: JSON.stringify(filterQuery),
			select: 'video,description,title,coverPhoto',
			limit: limit,
			skip: page === 0 ? 0 : (page - 1) * limit,
		};
		return qs.stringify(queryString);
	}

	render () {
		if (this.state.error) {
			return (
				<span>There is an error, please reload the page.{this.state.error}</span>
			);
		}

		const { isSelectionOpen, items, selectedItems } = this.state;
		return (
			<Modal isOpen={isSelectionOpen} onCancel={this.handleCancel} width="large" backdropClosesModal>
				<Modal.Header text="Select Video" showCloseButton onClose={this.handleCancel} />
				<Modal.Body>
					<div>
						{this._renderSearchFilter()}
						<VideoSelection
							videos={items}
							selectedVideos={selectedItems}
							selectionLimit={this.props.selectionLimit}
							updateSelection={this.updateSelection}
						/>
						<Pagination
							currentPage={this.state.currentPage}
							onPageSelect={this.handlePageSelect}
							pageSize={this.PAGE_SIZE}
							total={this.state.total}
							limit={PAGINATION_LIMIT}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button type="primary" onClick={this.handleSave}>Save</Button>
					<Button type="link-cancel" onClick={this.handleCancel}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

VideoSelector.propTypes = {
	apiPath: React.PropTypes.string,
	isSelectionOpen: React.PropTypes.bool,
	onChange: React.PropTypes.func.isRequired,
	onFinish: React.PropTypes.func.isRequired,
	selectedVideos: React.PropTypes.array,
	selectionLimit: React.PropTypes.number,
};

VideoSelector.defaultProps = {
	apiPath: '',
	isSelectionOpen: false,
	selectedVideos: [],
	selectionLimit: 1,
};

export default VideoSelector;
