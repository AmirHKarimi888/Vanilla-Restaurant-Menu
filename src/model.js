import { url } from "./api";

export const state = {
    recipes: [],
    recipe: {},
    likedRecipes: JSON.parse(localStorage.getItem("likedRecipes")),
    bookmarks: JSON.parse(localStorage.getItem("bookmarks"))
}

class Actions {
    async getRecipes(searchInput) {
        try {
            await fetch(`${url}recipes`)
            .then(res => res.json())
            .then((data) => {
                if(searchInput == "") {
                    state.recipes = [];
                } else {
                    state.recipes = data.filter((datum) => {
                        if(datum?.title.includes(searchInput) || datum?.title.toUpperCase().includes(searchInput) || datum?.title.toLowerCase().includes(searchInput)) {
                            return datum;
                        }
                    })
                }
            });   
        } catch(err) {
            console.log(err.message);
        }
    }

    async getRecipe(id) {
        try {
            await fetch(`${url}recipes/${id}`)
            .then(res => res.json())
            .then(data => state.recipe = data)
        } catch(err) {
            console.log(err.message);
        }
    }
}

export const Action = new Actions();