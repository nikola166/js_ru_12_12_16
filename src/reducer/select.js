import { SET_FILTER_SELECT } from '../constants'

export default (selected = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_FILTER_SELECT:
            return payload.selected;

    }

    return selected
}