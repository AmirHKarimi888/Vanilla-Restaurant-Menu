class RecipeView {
    main = document.querySelector("main");

    render() {
        this.generateMarkup();
    }

    clear() {
        this.main.innerHTML = "";
    }

    generateMarkup() {
        const markup = /*html*/`
        <div class="my-[150px] mx-auto shadow-lg lg:w-[78%] md:w-[85%] sm:w-[87%] max-sm:w-[95%] h-screen bg-white grid grid-cols-3">

          <div class="recipeList col-span-1 border-r cursor-pointer">
            <ul class="w-full">
              <li class="p-4 border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
                <img src="http://forkify-api.herokuapp.com/images/3309_MEDIUMc520.jpg" class="col-span-2 mx-auto w-[50px] aspect-square rounded-full"/>
                <div class="col-span-3">
                  <p class="text-sm">aaaaa</p>
                  <p class="text-xs text-zinc-500">ssssss</p>
                </div>
              </li>

              <li class="p-4 border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
                <img src="http://forkify-api.herokuapp.com/images/3309_MEDIUMc520.jpg" class="col-span-2 mx-auto w-[50px] aspect-square rounded-full"/>
                <div class="col-span-3">
                  <p class="text-sm">aaaaa</p>
                  <p class="text-xs text-zinc-500">ssssss</p>
                </div>
              </li>

              <li class="p-4 border-b grid grid-cols-5 gap-5 justify-center items-center hover:bg-zinc-100 duration-500">
              <img src="http://forkify-api.herokuapp.com/images/3309_MEDIUMc520.jpg" class="col-span-2 mx-auto w-[50px] aspect-square rounded-full"/>
              <div class="col-span-3">
                <p class="text-sm">aaaaa</p>
                <p class="text-xs text-zinc-500">ssssss</p>
              </div>
            </li>
            </ul>
          </div>

          <div class="recipe col-span-2">
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