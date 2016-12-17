import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        const { comment } = this.props;
        return (
            <div>
                <h4>{comment.user}</h4>
                <section>{comment.text}</section>
            </div>
        )
    }
}