class FooterView {

    footer = document.querySelector("footer");

    render() {
        this.generateMarkup();
    }

    generateMarkup() {
        const markup = /*html*/`
        <nav class="w-full p-8 bg-white border-gray-200 dark:bg-gray-900">

        </nav>
        `
        this.footer.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new FooterView();