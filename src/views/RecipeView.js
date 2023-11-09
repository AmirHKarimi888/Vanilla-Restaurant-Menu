import { addBookmark, getSelectedRecipe, likeRecipe } from "../../main";
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
        el.addEventListener("click", async () => {
          getSelectedRecipe(el.id);
          document.querySelector(".recipeList").classList.remove("max-sm:col-span-3");
          document.querySelector(".recipeList").classList.add("max-sm:hidden");

          document.querySelector(".recipe").classList.remove("max-sm:hidden");
          document.querySelector(".recipe").classList.add("max-sm:col-span-3");
        });
      })
    }

    renderListSpinner() {
      const markup = /*html*/`
      <div role="status" class=" w-full h-screen grid justify-center items-center">
    <svg aria-hidden="true" class="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
      </div>
      `
      this.clearRecipeList();
      this.main.querySelector(".recipeList").insertAdjacentHTML("afterbegin", markup);
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

    renderRecipeSpinner() {
      const markup = /*html*/`
      <div role="status" class=" w-full h-screen grid justify-center items-center">
    <svg aria-hidden="true" class="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-zinc-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
      </div>
      `
      this.clearRecipe();
      this.main.querySelector(".recipe").insertAdjacentHTML("afterbegin", markup);
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
        
        <div class="flex items-start">
          <button id="backToListBtn" class="hidden max-sm:block border border-white bg-white w-[36px] h-[36px] ml-1 rounded-full text-zinc-600"><i class="fa fa-arrow-left"></i><button>
        </div>
        <div class="recipeContainer p-2 rounded-sm bg-zinc-100 w-[80%] aspect-[1/1.2] max-sm:w-[96%] max-sm:aspect-[1/0.5] mx-auto text-zinc-800 text-center shadow-lg">
        <img src="${state.recipe?.image_url}" class="mx-auto my-5 w-[400px] h-[450px] max-sm:w-[330px] max-sm:h-[400px]  rounded-lg duration-500 shadow-lg" />
        <p class=" italic text-lg">${state.recipe?.title}</p>
        <p class="text-md text-zinc-500 my-5">${state.recipe?.publisher}</p>

        <div class="grid grid-cols-2">
          <div class=" flex justify-start items-center">
            <button id="likeBtn" class="w-[50px] aspect-square"><i class="${ state.likedRecipes.includes(state.recipe?.id) ? 'fa fa-heart text-red-500' : 'fa fa-heart-o' }"></i></button>
          </div>
          <div class=" flex justify-end items-center">
            <button id="bookmarksBtn" class="w-[50px] aspect-square"><i class="${ state.bookmarks.find(b => b?.id == state.recipe?.id ? b : null) ? 'fa fa-bookmark' : 'fa fa-bookmark-o' }"></i></button>
          </div>
          
        </div>
        </div>
        `
      }
      `

      this.clearRecipe();
      this.main.querySelector(".recipe").insertAdjacentHTML("afterbegin", markup);

      if(document.querySelector(".recipeContainer")) {
        document.querySelector("#likeBtn").addEventListener("click", likeRecipe);
        document.querySelector("#bookmarksBtn").addEventListener("click", addBookmark);

        document.querySelector("#backToListBtn").addEventListener("click", () => {

          document.querySelector(".recipeList").classList.remove("max-sm:hidden");
          document.querySelector(".recipeList").classList.add("max-sm:col-span-3");

          document.querySelector(".recipe").classList.remove("max-sm:col-span-3");
          document.querySelector(".recipe").classList.add("max-sm:hidden");
        })
      }
    }
    
    clearRecipe() {
      this.main.querySelector(".recipe").innerHTML = "";
    }

    generateMarkup() {
        const markup = /*html*/`
        <div class="my-[150px] max-sm:my-[72px] max-sm:mb-[0px] mx-auto shadow-lg lg:w-[78%] md:w-[85%] sm:w-[87%] h-screen bg-white grid grid-cols-3 max-sm:w-[100%]">

          <div class="recipeList overflow-y-scroll col-span-1 border-r max-sm:hidden">
          
          </div>

          <div class="recipe col-span-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 grid justify-center items-center p-2 max-sm:col-span-3">

          </div>
        </div>
        `
        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new RecipeView();