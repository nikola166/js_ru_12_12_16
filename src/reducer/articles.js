import { DELETE_ARTICLE, ADD_COMMENT } from '../constants'
import { normalizedArticles } from '../fixtures'
import { arrayToMap, mapToArray} from '../helpers'
import { Record } from 'immutable'

const ArticleModel = Record({
    "id": null,
    "date": null,
    "title": null,
    "text": null,
    "comments": []
})

const defaultState = arrayToMap(normalizedArticles, ArticleModel)

export default (articlesState = defaultState, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            return articlesState.delete(payload.id)
        break;
        case ADD_COMMENT:
            // Добавляем в список коментарий
            let newArticleModel = articlesState.get(payload.articleId);
            //обрати внимание, comments - обычный массив, значит ты мутируеш стейт
            newArticleModel.comments.push(payload.comment.id);
            //а вот эта строчка не делает вообще ничего, ты создаешь новый объект и сразу его теряешь
            articlesState.set(articlesState.id, newArticleModel);
            break;
    }

    return articlesState
}
