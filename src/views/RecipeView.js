import { getSelectedRecipe } from "../../main";
import { state } from "../model";

class RecipeView {
    main = document.querySelector("main");

    render() {;
        this.generateMarkup();
        this.recipeHandlers();
    }

    clear() {
        this.main.innerHTML = "";
    }

    recipeHandlers() {
      this.main.querySelectorAll(".recipeListItem").forEach((el) => {
        el.addEventListener("click", async () => getSelectedRecipe(el.id));
      })
    }

    renderRecipeList() {

      const markup = /*html*/`
      <ul class="w-full">
      ${
        state.recipes.map((recipe) => {
          return(/*html*/`
          <li id="${recipe?.id}" class="recipeListItem p-4 cursor-pointer border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
            <img src="${recipe?.image_url}" class="col-span-2 mx-auto w-[50px] aspect-square rounded-full"/>
            <div class="col-span-3">
              <p class="text-sm">${recipe?.title}</p>
              <p class="text-xs text-zinc-500">${recipe?.publisher}</p>
            </div>
          </li>
          `)
        }).join("")
      }
      </ul>
      `

      this.clearRecipeList();
      this.main.querySelector(".recipeList").insertAdjacentHTML("afterbegin", markup);
    }

    clearRecipeList() {
      this.main.querySelector(".recipeList").innerHTML = "";
    }

    renderRecipe() {

      const markup = /*html*/`
      ${
        !window.location.hash ? 
        `
        <div class="w-full h-screen grid justify-center items-center">
          <p class="text-sm p-2 bg-yellow-600 rounded-full text-white text-center shadow-lg">Search for something!</p>
        </div>
        ` : 
        `
        <div style="background: url('${state.recipe?.image_url}'); background-size: cover;background-position: right top;background-repeat: no-repeat;" class="w-full h-[300px]">
              
        </div>
        `
      }

      `

      this.clearRecipe();
      this.main.querySelector(".recipe").insertAdjacentHTML("afterbegin", markup);
    }
    
    clearRecipe() {
      this.main.querySelector(".recipe").innerHTML = "";
    }

    generateMarkup() {
        const markup = /*html*/`
        <div class="my-[150px] mx-auto shadow-lg lg:w-[78%] md:w-[85%] sm:w-[87%] max-sm:w-[95%] h-screen bg-white grid grid-cols-3 max-sm:grid-cols-7">

          <div class="recipeList overflow-y-scroll col-span-1 max-sm:col-span-3 border-r">
          
          </div>

          <div class="recipe col-span-2 max-sm:col-span-4 bg-zinc-100">

          </div>
        </div>
        `
        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new RecipeView();