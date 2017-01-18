import { INCREMENT, DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE,
    START, SUCCESS, FAIL, LOAD_COMMENTS } from '../constants'
import $ from 'jquery'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function addComment(articleId, comment) {
    return {
        type: ADD_COMMENT,
        payload: { articleId, comment },
        generateId: true
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticleById(id) {
    return (dispatch, getState) => {
        if (getState().articles.getIn(['entities', id, 'text'])) return null

        dispatch({
            type: LOAD_ARTICLE + START,
            payload: { id }
        })

        $.get(`/api/article/${id}`)
            .done(response => dispatch({
                type: LOAD_ARTICLE + SUCCESS,
                payload: { id },
                response
            }))
            .fail(error => dispatch({
                type: LOAD_ARTICLE + FAIL,
                payload: { id },
                error
            }))
    }
}

// Функция загрузки комментариев к статье
export function loadCommentByArticleId(articleId) {
    return (dispatch, getState) => {
        // Если у нас комментарии уже загружены то не загружаем
        if (getState().comments.loaded.indexOf(articleId) != -1) return null

        dispatch({
            type: LOAD_COMMENTS + START,
            payload: { articleId }
        })
        setTimeout(() => {
            $.get(`/api/comment?article=${articleId}`)
                .done(response => dispatch({
                    type: LOAD_COMMENTS + SUCCESS,
                    payload: {articleId},
                    response
                }))
                .fail(error => dispatch({
                    type: LOAD_COMMENTS + FAIL,
                    payload: {articleId},
                    error
                }))
        }, 1000);
    }
}