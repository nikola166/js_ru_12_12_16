import React, { Component, PropTypes } from 'react'
import {addComment, loadCommentByArticleId} from '../AC'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'
import Loader from './Loader'
import { mapToArray } from '../helpers'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    // Если props компонента меняется
    componentWillReceiveProps(nextProps) {
        // Если в старом props isOpen = false а в новом isOpen=true, то загружаем комментарии к статье
        if (!this.props.isOpen && nextProps.isOpen) {
            nextProps.loadCommentByArticleId(nextProps.article.id)
        }
    }

    render() {
        return (
            <div>
                {this.getLink()}
                {this.getBody()}
            </div>
        )
    }

    getLink() {
        return <a href="#" onClick = {this.props.toggleOpen}>
            {this.props.isOpen ? 'hide' : 'show'} comments
        </a>
    }

    getBody() {
        const { comments, article, isOpen, addComment, loading } = this.props
        if (!isOpen) return null

        const form = <NewCommentForm addComment={(comment) => addComment(article.id, comment)} />

        if (!comments.length) return <div><p>No comments yet</p>{form}</div>

        if (loading) return (
            <div>
                <Loader />
            </div>
        )

        const commentItems = comments.map(comment => {
            // Если я не проверяю на undefined то падает с ошибкой. У меня почему-то в comments до загрузки находится массив с undefined до загрузки коментариев
            //props.article.comments - массив с id-шниками, когда делаешь .map - превращаешь его в массив с комментами, но для каждого id storeState.comments.entities.get(id) === undefined
            if (comment != undefined) return <li key={comment.id}><Comment comment={comment}/></li>
        });

        return (
            <div>
                <ul>{commentItems}</ul>
                {form}
            </div>
        )
    }
}

export default connect((storeState, props) => {
    return {
        comments: props.article.comments.map(id => storeState.comments.entities.get(id)),
        loading: storeState.comments.loading
    }
}, { addComment, loadCommentByArticleId })(toggleOpen(CommentList))
