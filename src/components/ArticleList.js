import React, { Component } from 'react'
import Article from './Article'

import CommentList from './CommentList'

export default class ArticleList extends Component {
    render() {
        const { articles } = this.props;
        const articleElements = articles.map(article =>
            <li key = {article.id}>
                <Article article = {article}></Article>
                <CommentList comments = {article.comments}></CommentList>
            </li>);
        return (
            <div>
                <h2>Article List</h2>
                <ul>
                    {/*some comment*/}
                    {articleElements}
                </ul>
            </div>
        )
    }
}