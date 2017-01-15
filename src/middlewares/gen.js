import {ADD_COMMENT} from '../constants'

function generateId() {
    return Math.random().toString(34).slice(2);
}

export default store => next => action => {
    const {type, payload} = action;
    switch (type) {
        case ADD_COMMENT:
            let newPayload = Object.assign({}, payload);
            newPayload.comment.id = generateId();
            return next(Object.assign({}, {type: type, payload:newPayload}));
            break
        default:
            return next(action);
    }
}