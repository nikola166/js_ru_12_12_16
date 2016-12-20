import React, { Component, PropTypes } from 'react'

export default class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    render() {
        const { comment: { text, user } } = this.props
        return (
            <div>
                {text} <b>{user}</b>
            </div>
        )
    }
}