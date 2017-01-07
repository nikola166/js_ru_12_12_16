import { SET_FILTER_DATE } from '../constants'
import { DateUtils } from 'react-day-picker'

export default (dateState={from: null,to: null}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_FILTER_DATE:
            var newFilterState = DateUtils.addDayToRange(payload.day, dateState)
            return newFilterState;
    }

    return dateState
}