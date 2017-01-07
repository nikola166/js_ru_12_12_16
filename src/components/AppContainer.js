import React, { PropTypes } from 'react'
import ArticleList from './ArticleList'
import Filter from './Filters'

function AppContainer(props) {
    return (
        <div>
            <Filter articles = {[]}/>
            <ArticleList/>
        </div>
    )
}

export default AppContainer