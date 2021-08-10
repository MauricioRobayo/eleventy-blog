export default class Loader {
  #interval;
  constructor() {
    this.ref = document.createElement("span");
    this.ref.classList.add("repo-loader");
  }

  start() {
    const loaderSymbols = ["\\", "|", "/", "—"];
    let i = 0;
    this.ref.textContent = loaderSymbols[i % loaderSymbols.length];
    this.#interval = setInterval(() => {
      i += 1;
      this.ref.textContent = loaderSymbols[i % loaderSymbols.length];
    }, 500);
  }

  stop(textContent = "") {
    clearInterval(this.#interval);
    this.ref.textContent = textContent;
  }
}
