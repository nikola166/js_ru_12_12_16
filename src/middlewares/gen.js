import {ADD_COMMENT} from '../constants'

function generateId() {
    return Math.random().toString(34).slice(2);
}

export default store => next => action => {
    const {type, payload} = action;
    switch (type) {
    //через мидлвары будет проходить каждый экшин, они должны быть максимально общими, завязывать на конкретные экшины - плохая практика
        case ADD_COMMENT:
            let newPayload = Object.assign({}, payload);
            newPayload.comment.id = generateId();
            //Object.assign здесь лишний
            return next(Object.assign({}, {type: type, payload:newPayload}));
            break
        default:
            return next(action);
    }
}
