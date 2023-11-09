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
        /*html*/`
        <div class="w-full h-screen grid justify-center items-center">
          <p class="text-sm p-2 bg-yellow-600 rounded-full text-white text-center shadow-lg">Search for something!</p>
        </div>
        ` : 
        /*html*/`
        
        <div class="p-2 rounded-sm bg-zinc-100 w-[80%] aspect-[1, 1.2] mx-auto text-zinc-800 text-center shadow-lg">
        <img src="${state.recipe?.image_url}" class="mx-auto my-5 w-[400px] h-[450px] max-sm:w-[200px] max-sm:h-[400px]  rounded-lg duration-500 shadow-lg" />
        <p class=" italic text-lg">${state.recipe?.title}</p>
        <p class="text-md text-zinc-500 my-5">${state.recipe?.publisher}</p>

        <div class="grid grid-cols-2">
          <div class=" flex justify-start items-center">
            <button id="likeBtn" class="w-[50px] aspect-square"><i class="fa fa-heart-o"></i></button>
          </div>
          <div class=" flex justify-end items-center">
            <button id="bookmarkBtn" class="w-[50px] aspect-square"><i class="fa fa-bookmark-o"></i></button>
          </div>
          
        </div>
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

          <div class="recipe col-span-2 max-sm:col-span-4 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 grid justify-center items-center p-2">

          </div>
        </div>
        `
        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new RecipeView();