import { DELETE_ARTICLE, SET_FILTER_SELECT, SET_FILTER_DATE, FILTER_ARTICLE } from '../constants'

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function setFilterSelect(selected) {
    return {
        type: SET_FILTER_SELECT,
        payload: { selected: selected }
    }
}

export function setFilterDate(day) {
    return {
        type: SET_FILTER_DATE,
        payload: {day}
    }
}