import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CommentInput extends Component{
	static propTypes = {
		username: PropTypes.string,
		onSubmit: PropTypes.func,
		onUsernameInputBlur: PropTypes.func
	}

	static defaultProps = {
		username: ''
	}

	constructor(props) {
		super(props);
		this.state = {
			username: props.username, // 从props上取username字段
			content: ''
		}
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value
		})
	}

	handleContentChange(event) {
		this.setState({
			content: event.target.value
		})
	}

	handleUsernameBlur(event) {
		if(this.props.onUsernameInputBlur){
			this.props.onUsernameInputBlur(event.target.value);
		}
	}

	handleSubmit() {
		if(this.props.onSubmit) {
			this.props.onSubmit({
				username: this.state.username,
				content: this.state.content,
				createdTime: + new Date()
			})
		}
		this.setState({content: ''})
	}

	componentDidMount() {
		this.textarea.focus();
	}

	render() {
		return (
			<div className="comment-input">
				<div className="comment-field">
					<span className="comment-field-name">用户名：</span>
					<div className="comment-field-input">
						<input value={this.state.username} onBlur={this.handleUsernameBlur.bind(this)} onChange={this.handleUsernameChange.bind(this)}/>
					</div>
				</div>
				<div className="comment-field">
					<span className="comment-field-name">评论内容：</span>
					<div className="comment-field-input">
						<textarea ref={(textarea) => this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)}/>
					</div>
				</div>
				<div className="comment-field-button">
					<button onClick={this.handleSubmit.bind(this)}>发布</button>
				</div>
			</div>
		)
	}
}