import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article'
import accordion from '../decorators/accordion'
import { connect } from 'react-redux'

class ArticleList extends React.Component {

    render() {
        const {articles, isOpenItem, toggleOpenItem} = this.props
        const articleElements = articles.map(article =>
            <li key={article.id}>
                <Article article={article}
                         isOpen={isOpenItem(article.id)}
                         onClick={toggleOpenItem(article.id)}
                />
            </li>)
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

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    isOpenItem: PropTypes.func.isRequired,
    toggleOpenItem: PropTypes.func.isRequired
}

const getFilterArticleList = (articles, filters) => {
    return articles.filter(function (article) {
        if (filters.selected != null &&filters.selected.value && article.id != filters.selected.value ) return false;

        if (filters.date.from != null && new Date(filters.date.from) > new Date(article.date)) return false;
        if (filters.date.to != null &&  new Date(filters.date.to) < new Date(article.date)) return false;

        return true;
    });;
}

export default connect(
    (state) => {
        return {
            articles: getFilterArticleList(state.articles, state.filters)
        }
    },
)(accordion(ArticleList))