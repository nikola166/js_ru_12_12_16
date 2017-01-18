import { ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS, FAIL } from '../constants'
import { normalizedComments } from '../fixtures'
import { arrayToMap } from '../helpers'
import { Record, OrderedMap } from 'immutable'

const CommentModel = Record({
    id: null,
    text: null,
    user: null
})

const DefaultReducerState = Record({
    error: null,
    loading: true,
    loaded: [],
    entities: new OrderedMap({})
})

export default (state = new DefaultReducerState({}), action) => {
    const { type, payload, response, error, randomId } = action
    switch (type) {
        // Добавление комментариев с новой вложенностью
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentModel({...payload.comment, id: randomId}))

        // Start loading
        case LOAD_COMMENTS + START:
            //здесь так не пройдет, ведь теоретически ты можешь одновременно для нескольких статей загружать
            return state.set('loading', true)

        // Success response
        case LOAD_COMMENTS + SUCCESS:
            return state
                .mergeIn(['entities'], arrayToMap(response, CommentModel))
                .set('loading', false)
                //можно просто update('loaded', ...)
                .updateIn(['loaded'], loaded => loaded.concat(payload.articleId))
                .set('error', null)
        // Error response
        case LOAD_COMMENTS + FAIL:
            return state
                .set('error', error)
                .set('loading', false)
    }

    return state
}
