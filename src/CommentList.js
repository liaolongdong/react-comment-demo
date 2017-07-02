import React, {Component} from 'react';
import Comment from './Comment';

class CommentList extends Component {
	static defaultProps = {
		comments: []
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
				{this.props.comments.map((comment, i) => <Comment comment={comment} key={i}/>)}
			</div>
		)
	}
}

export default CommentList