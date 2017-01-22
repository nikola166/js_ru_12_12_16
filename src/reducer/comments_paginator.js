import { LOAD_COMMENTS, SHOW_COMMENTS, START, SUCCESS, FAIL } from '../constants'
import { arrayToMap } from '../helpers'
import { Record, OrderedMap } from 'immutable'

const CommentModel = Record({
    id: null,
    text: null,
    user: null
})

const DefaultReducerState = Record({
    error: null,
    pageCount: 0,
    //вот эта информация лишняя, тебе следовало вынести это в параметры роута
    currentPage: null,
    loadingPage: [],
    entities: new OrderedMap({})
})
//так тоже можно, но я не вижу смысла выносить в отдельный редюсер, ведь по сути это такие же комменты
export default (state = new DefaultReducerState({}), action) => {
    const { type, payload, response } = action

    switch (type) {
        // Действие Завершение загрузки коментариев
        case LOAD_COMMENTS + SUCCESS:
            const currentPage = payload.selected === undefined ? 0 : payload.selected;
            return state.mergeIn(['entities'], arrayToMap(response.records, CommentModel)).set('pageCount', Math.ceil(response.total / payload.limit)).set('currentPage', currentPage).update('loadingPage', loadingPage => loadingPage.concat(currentPage).unique());
        case SHOW_COMMENTS:
            return state.set('currentPage', payload.selected);
    }

    return state
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
