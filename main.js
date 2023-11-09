import './src/style/style.css';
import './src/views/template';
import { state, Action } from './src/model'
import HeaderView from './src/views/HeaderView';
import RecipeView from './src/views/RecipeView';

HeaderView.render();

RecipeView.render();

export const getSearchResults = async () => {
    let searchInput = HeaderView.returnSearchInputValue();

    await Action.getRecipes(searchInput)
    .then(() => RecipeView.renderRecipeList())
    .then(() => HeaderView.headerHandlers());
}

const init = () => {
    ["load", "hashchange"].forEach((e) => {
        window.addEventListener(e, () => {
            RecipeView.render();
        })
    })
}

init();