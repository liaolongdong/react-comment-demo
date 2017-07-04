import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
	static propTypes = {
		comments: PropTypes.array,
		onDeleteComment: PropTypes.func
	}
	static defaultProps = {
		comments: []
	}
	handleDeleteComment(index) {
		if(this.props.onDeleteComment) {
			this.props.onDeleteComment(index);
		}
	}
	render() {
		// const comments = [
		// 	{username: 'xiaoxin', content: 'hello'},
		// 	{username: 'xiaonian', content: 'react'},
		// 	{username: 'xiaowu', content: 'demo'}
		// ];

		// return (
		// 	<div>
		// 		{comments.map((comment, i) => {
		// 			return (
		// 				<div key={i}>
		// 					{comment.username}：{comment.content}
		// 				</div>
		// 			)
		// 		})}
		// 	</div>
		// )

		return (
			<div>
				{this.props.comments.map((comment, i) => <Comment comment={comment} key={i} index={i} onDeleteComment={this.handleDeleteComment.bind(this)}/>)}
			</div>
		)
	}
}

export default CommentList