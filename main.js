import "./src/style/style.css";
import "./src/views/template";
import { state, Action } from "./src/model";
import HeaderView from "./src/views/HeaderView";
import RecipeView from "./src/views/RecipeView";

"likedRecipes" in localStorage ? null : localStorage.setItem("likedRecipes", "[]");
"bookmarks" in localStorage ? null : localStorage.setItem("bookmarks", "[]");

HeaderView.render();

RecipeView.render();

export const getSearchResults = async () => {
  let searchInput = HeaderView.returnSearchInputValue();

  await Action.getRecipes(searchInput)
    .then(() => RecipeView.renderRecipeList())
    .then(() => HeaderView.headerHandlers())
    .then(() => RecipeView.recipeHandlers());
};

export const getSelectedRecipe = async (id) => {
  window.location.hash = id;
};

export const likeRecipe = () => {
    
    if(state.likedRecipes.includes(state.recipe.id)) {
        state.likedRecipes = state.likedRecipes.filter(r => r != state.recipe.id);
    } else {
        state.likedRecipes.push(state.recipe.id);
    }
    localStorage.setItem("likedRecipes", JSON.stringify(state.likedRecipes));
    RecipeView.renderRecipe();
}

export const addBookmark = () => {

    let repeatitive = state.bookmarks.filter(bookmark => bookmark.id == state.recipe.id)[0];
    if(repeatitive?.id == state.recipe.id) {
        state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id != repeatitive.id );
    } else {
        state.bookmarks.push(state.recipe);
    }
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    RecipeView.renderRecipe();
}

const init = () => {
  ["load", "hashchange"].forEach((e) => {
    window.addEventListener(e, async () => {

      let id = window.location.hash.slice(1);
      !id ? id = "" : null;

      await Action.getRecipe(id)
        .then(() => RecipeView.renderRecipe())
        .then(() => RecipeView.recipeHandlers());
    });
  });
};

init();
