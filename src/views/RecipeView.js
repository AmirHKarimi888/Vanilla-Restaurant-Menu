import { state } from "../model";

class RecipeView {
    main = document.querySelector("main");

    render() {;
        this.generateMarkup();
    }

    clear() {
        this.main.innerHTML = "";
    }

    renderRecipeList() {

      const markup = /*html*/`
      <ul class="w-full">
      ${
        state.recipes.map((recipe) => {
          return(/*html*/`
          <li id="${recipe?.id}" class="p-4 cursor-pointer border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
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

    generateMarkup() {
        const markup = /*html*/`
        <div class="my-[150px] mx-auto shadow-lg lg:w-[78%] md:w-[85%] sm:w-[87%] max-sm:w-[95%] h-screen bg-white grid grid-cols-3 max-sm:grid-cols-7">

          <div class="recipeList overflow-y-scroll col-span-1 max-sm:col-span-3 border-r">
          <ul class="w-full">
              <li class="h-[100px] p-4 grid justify-center items-center text-yellow-600">
                <div>
                  <p class="text-sm">Search for something!</p>
                </div>
              </li>
          </ul>
          </div>

          <div class="recipe col-span-2 max-sm:col-span-4">
            <div class="bg-[url('https://forkify-api.herokuapp.com/images/9649_MEDIUM7140.jpg')] w-full h-[200px] bg-cover bg-right-top bg-no-repeat">
              
            </div>
          </div>
        </div>
        `
        this.clear();
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new RecipeView();