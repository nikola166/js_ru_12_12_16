import { normalizedComments } from '../fixtures'
import { arrayToMap, mapToArray } from '../helpers'
import { Record } from 'immutable'
import { ADD_COMMENT } from '../constants'

const CommentModel = Record({
    "id": null,
    "user": null,
    "text": null
})

const defaultState = arrayToMap(normalizedComments, CommentModel);

export default (commentsState = defaultState, action) => {
    const { type, payload, response, error } = action

    switch (type) {
        case ADD_COMMENT:
            // Почему-то не добавлялся
            //const newComment = new CommentModel(action.payload.comment)
            //commentsState.set(newComment.id, newComment);
            //вся идея с иммутабельными данными - ты не изменяешь состояние объекта, а создаешь новый. commentsState.set создаст новый объект и его нужно будет вернуть. А у тебя он просто теряется

            // Добавляем в список коментарией
            let newCommentsState = mapToArray(commentsState);
            newCommentsState.push(action.payload.comment);
            newCommentsState = arrayToMap(newCommentsState, CommentModel);
            return newCommentsState;
            break;
    }

    return commentsState
}
