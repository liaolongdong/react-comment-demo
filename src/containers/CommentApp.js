import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import {formatPhoneNum} from '../commonTool';

export default class CommentApp extends Component {
	componentDidMount () {
		// console.log(formatPhoneNum('135****1025'));
	}
	render() {
		return (
			<div className='wrapper'>
				<CommentInput />
				<CommentList />
			</div>
		)
	}
}