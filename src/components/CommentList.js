import React, { Component } from 'react'
import Comment from './Comment'


export default class CommentList extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }
    render() {
        return (
            <div>
                <button onClick = {this.toggleOpen}>{this.getButtonText()}</button>
                <ul>
                    {this.getBody()}
                </ul>
            </div>
        )
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    getBody() {
        if (!this.state.isOpen) return null;
        else {
            const {comments} = this.props;
            if (undefined == comments) return;
            else {
                const commentsElements = comments.map(comment => <li key={comment.id}><Comment
                    comment={comment}></Comment></li>);
                return <div>{commentsElements}</div>;
            }
        }
    }

    getButtonText() {
        if (!this.state.isOpen) return `Show comments`;
        else return `Hide comments`;;
    }
}