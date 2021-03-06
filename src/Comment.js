import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
	static propTypes = {
		comment: PropTypes.object.isRequired,
		onDeleteComment: PropTypes.func,
		index: PropTypes.number
	}
	constructor() {
		super();
		this.state = {timeString: ''};
	}
	handleDeleteComment() {
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(this.props.index);
		}
	}
	_updateTimeString() {
		const comment = this.props.comment;
		const duration = (+ Date.now() - comment.createdTime)/1000;
		// this.setState({
		// 	timeString: duration > 60 
		// 		? `${Math.round(duration/60)}分钟前`
		// 		: `${Math.round(Math.max(duration, 1))}秒前`
		// });
		let timeString;
		if(duration < 60){
			timeString = `${Math.round(duration)}秒前`;
		}else if(duration >= 60 && duration < 3600){
			timeString = `${Math.round(duration/60)}分钟前`;
		}else if(duration > 3600 && duration < 3600*24){
			timeString = `${Math.round(duration/3600)}小时前`;
		}else{
			let commentTime = new Date(Number(comment.createdTime));
			let year = commentTime.getFullYear();
			let month = (commentTime.getMonth() + 1) > 9 ? (commentTime.getMonth() + 1) : '0' + (commentTime.getMonth() + 1);
			let day = commentTime.getDate() > 9 ? commentTime.getDate() : '0' + commentTime.getDate();
			let hour = commentTime.getHours() > 9 ? commentTime.getHours() : '0' + commentTime.getHours();
			let minute = commentTime.getMinutes() > 9 ? commentTime.getMinutes() : '0' + commentTime.getMinutes();
			let second = commentTime.getSeconds() > 9 ? commentTime.getSeconds() : '0' + commentTime.getSeconds();
			timeString = `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
		}
		this.setState({
			timeString: timeString
		});
	}
	_getProcessedContent(content) {
		return content
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
			.replace(/`([\S\s]+?)`/g, '<code>$1</code');
	}
	componentWillMount() {
		this._updateTimeString();
		this._timer = setInterval(this._updateTimeString.bind(this), 5000);
	}
	componentWillUnmount() {
		clearInterval(this._timer);
	}
	render() {
		return (
			<div className='comment'>
				<div className='comment-username'>
					<span>{this.props.comment.username}</span>：
				</div>
				<p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}/>
				<span className='comment-createdtime'>
					{this.state.timeString}
				</span>
				<span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>删除</span>
			</div>
		)
	}
}

export default Comment;
