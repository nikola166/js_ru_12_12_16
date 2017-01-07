import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'

import { setFilterSelect } from '../AC'

class ArticlesSelect extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    render() {
        const {articles, selected} = this.props

        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        return (
            <div>
                <Select options={options} value={selected} onChange={this.props.setFilterSelect}/>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            articles: state.articles,
            selected: state.filters.selected
        }
    }, {setFilterSelect}
)(ArticlesSelect)