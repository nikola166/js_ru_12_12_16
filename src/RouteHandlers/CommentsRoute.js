import React, { Component, PropTypes } from 'react'
import CommentsPaginator from '../components/CommentsPaginator'

class CommentsPaginatorRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <CommentsPaginator perPage={2}/>
                {this.props.children}
            </div>
        )
    }
}

export default CommentsPaginatorRoute