import React, {PropTypes} from 'react'
import Article from './Article'
import accordionDecorator from '../decorators/accordionDecorator'

class ArticleList extends React.Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    render() {
        const {articles} = this.props
        const articleElements = articles.map(article =>
            <li key={article.id}>
                <Article article={article}
                         isOpen={this.props.openArticleId == article.id}
                         onClick={this.props.toggleOpen(article.id)}
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

    toggleOpenArticle = id => ev => {
        this.setState({
            openArticleId: id
        })
    }
}

export default accordionDecorator(ArticleList);