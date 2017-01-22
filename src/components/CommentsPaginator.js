import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import {connect} from 'react-redux'
import {loadComments, showCommentsFromLoaded} from '../AC/index'
import {mapToArray} from '../helpers'
import ReactPaginate from 'react-paginate';
import '../css/style.css'

class CommentsPaginator extends Component {
    static propTypes = {
        article: PropTypes.object
    }

    componentDidMount() {
        let offset = Math.ceil(this.props.currentPage * this.props.perPage);
        this.loadCommentsFromServer(offset);
    }

    render() {
        const { comments } = this.props;
        const commentItems = comments.map(comment => <li key={comment.id}><Comment comment={comment}/></li>);

        return (
            <div>
                <ul>{commentItems}</ul>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.props.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
            </div>
        )
    }

    loadCommentsFromServer(offset, selected) {
        this.props.loadComments(this.props.perPage, offset, selected);
    }
    //Я предпочитаю не подвязываться на взаимодействие - это императивно программирование. Попробуй лучше декларативно в описать загрузку в том месте, где ты эти комменты будешь показывать, а здесь по клику просто делай переход на нужную страницу(с помощью роутера)
    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);
        //можно, но все же лучше принимать это решение на уровне бизнес-логики(в AC), чем вьюхи(в компоненте)
        if (this.props.loadingPage.indexOf(selected) == -1) {
            this.loadCommentsFromServer(offset, selected);
        } else {
            this.props.showCommentsFromLoaded(this.props.perPage, offset, selected);
        }
    };
}

function getComments(list, perPage, currentPage) {
    console.log(list, perPage, currentPage);
    let offset = Math.ceil(currentPage * perPage);
    let arrayList = mapToArray(list);
    return arrayList.slice(offset, offset+perPage);
}

export default connect((storeState, props) => {
    return {
        comments: getComments(storeState.comments_paginator.entities, props.perPage, storeState.comments_paginator.currentPage),
        perPage: props.perPage,
        currentPage: storeState.comments_paginator.currentPage,
        pageCount: storeState.comments_paginator.pageCount,
        loadingPage: storeState.comments_paginator.loadingPage
    }
}, {loadComments, showCommentsFromLoaded})(CommentsPaginator)
