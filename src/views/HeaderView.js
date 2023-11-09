import { getSearchResults, getSelectedRecipe } from "../../main";
import { state } from "../model";

class HeaderView {
    header = document.querySelector("header");

    render() {
        this.generateMarkup();
        this.headerHandlers();
    }

    clear() {
        this.header.innerHTML = "";
    }

    headerHandlers() {
      this.header.querySelector("#searchBtn").addEventListener("click", async () => getSearchResults());
      this.header.querySelector("#searchInput").addEventListener("keyup", async (event) => event.key == "Enter" ? getSearchResults() : null);
      this.header.querySelector("#showBookmarksBtn").addEventListener("click", this.renderBookmarksView);
      this.header.querySelector(".bookmarks").addEventListener("click", this.clearBookmarksView);
    }

    returnSearchInputValue() {
      return this.header.querySelector("#searchInput").value;
    }

    renderBookmarksView() {
      const markup = /*html*/`
      <div class="bookmarksBackdrop fixed top-0 left-0 w-full h-screen bg-zinc-400/50 grid justify-center items-center overflow-y-scroll">
        <div class="bookmarksList w-[360px] p-2 bg-zinc-100">
        <ul class="w-full">
        ${
          state.bookmarks.map((recipe) => {
            return(/*html*/`
            <li id="${recipe?.id}" class="bookmarksListItem p-4 cursor-pointer border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
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
        </div>
      </div>
      `

      document.querySelector(".bookmarks").insertAdjacentHTML("afterbegin", markup);
      document.querySelector(".bookmarksList").addEventListener("click", (event) => event.stopPropagation());

      document.querySelectorAll(".bookmarksListItem").forEach((el) => {
        el.addEventListener("click", async () => {
          getSelectedRecipe(el.id);
          document.querySelector(".recipeList").classList.remove("max-sm:col-span-3");
          document.querySelector(".recipeList").classList.add("max-sm:hidden");

          document.querySelector(".recipe").classList.remove("max-sm:hidden");
          document.querySelector(".recipe").classList.add("max-sm:col-span-3");
        });
      })
    }

    clearBookmarksView() {
      document.querySelector(".bookmarks").innerHTML = "";
    }

    generateMarkup() {
        const markup = /*html*/`
        <nav class="fixed top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900">
  <div class="flex grid-cols-5 gap-2 items-center justify-between mx-auto p-5 shadow-md">

    <a href="/" class="col-span-1 flex items-center">
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-zinc-600 dark:text-white">Menu</span>
    </a>


    <div class="col-span-2">
      <div class="relative md:block">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer" id="searchBtn">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search icon</span>
        </div>
        <input type="text" id="searchInput"
          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search...">
      </div>
    </div>

    <div class="col-span-2 text grid grid-cols-1 justify-center items-center">

      <button type="button"
        id="showBookmarksBtn"
        class="flex grid-cols-2 gap-1 items-center p-2 justify-center text-sm max-sm:text-xs text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <i class="fa fa-bookmark-o"></i> Bookmarks
      </button>
    </div>
  </div>
</nav>

<div class="bookmarks">

</div>
        `
        this.clear();
        this.header.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new HeaderView();