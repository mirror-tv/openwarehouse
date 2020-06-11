import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'cornerstone-elemental';

class FlashMessage extends React.Component {
	constructor(props) {
		super(props);

		this.renderMessage = this.renderMessage.bind(this);
	}

	renderMessage(message) {
		if (typeof message === 'string') return <span>{message}</span>;

		let title = message.title ? <h4>{message.title}</h4> : null;
		let detail = message.detail ? <p>{message.detail}</p> : null;
		let list = message.list ? (
			<ul style={{ marginBottom: 0 }}>
				{message.list.map((item, i) => <li key={`i${i}`}>{item}</li>)}
			</ul>
		) : null;

		return (
			<span>
				{title}
				{detail}
				{list}
			</span>
		);
	}

	render() {
		return <Alert type={this.props.type}>{this.renderMessage(this.props.message)}</Alert>;
	}
}

FlashMessage.propTypes = {
	message: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	]),
	type: PropTypes.string,
};

class FlashMessages extends React.Component {
	constructor(props) {
		super(props);

		this.renderMessages = this.renderMessages.bind(this);
		this.renderTypes = this.renderTypes.bind(this);
	}

	renderMessages(messages, type) {
		if (!messages || !messages.length) return null;

		return messages.map((message, i) => {
			return <FlashMessage message={message} type={type} key={`i${i}`} />;
		});
	}

	renderTypes(types) {
		return Object.keys(types).map(type => this.renderMessages(types[type], type));
	}

	render() {
		if (!this.props.messages) return null;

		return (
			<div className="flash-messages">
				{this.renderTypes(this.props.messages)}
			</div>
		);
	}
}

FlashMessages.propTypes = {
	messages: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			error: PropTypes.array,
			hilight: PropTypes.array,
			info: PropTypes.array,
			success: PropTypes.array,
			warning: PropTypes.array,
		}),
	]),
};

export default FlashMessages;
