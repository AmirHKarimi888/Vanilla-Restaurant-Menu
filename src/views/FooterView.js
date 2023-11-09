class FooterView {

    footer = document.querySelector("footer");

    render() {
        this.generateMarkup();
    }

    generateMarkup() {
        const markup = /*html*/`
        <nav class="border-t w-full p-6 text-zinc-600 text-sm bg-white border-gray-200 dark:bg-gray-900 flex justify-center items-center">
          Made by : <a href="https://amirhk888.iran.liara.run"> AmirHK888</a>
        </nav>
        `
        this.footer.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new FooterView();