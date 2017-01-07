import { DELETE_ARTICLE, FILTER_ARTICLE } from '../constants'
import { articles } from '../fixtures'

import store from '../store'

export default (articlesState = articles, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_ARTICLE:
            return articlesState.filter(article => article.id !== payload.id);
    }

    return articlesState
}