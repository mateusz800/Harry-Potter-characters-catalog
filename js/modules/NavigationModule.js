import FavouritesModule from "./FavouritesModule.js";
import {
  StudentsModule,
  GryffindorModule,
  SlytherinModule,
  HufflepuffModule,
  RavenclawModule,
} from "./tableModules.js";

export default class NavigationModule {
  static instance;

  allStudentsModule = new StudentsModule();
  gryffindorModule = new GryffindorModule();
  slytherinModule = new SlytherinModule();
  hufflepuffModule = new HufflepuffModule();
  ravenclawModule = new RavenclawModule();
  favouritesModule = new FavouritesModule();

  constructor() {
    this.allStudentsModule.show();
    document
      .querySelector("button.students")
      .addEventListener("click", (e) => this.showModule(this.allStudentsModule, e.target));
    document
      .querySelector("button.gryffindor")
      .addEventListener("click", (e) => this.showModule(this.gryffindorModule, e.target));
    document
      .querySelector("button.slytherin")
      .addEventListener("click", (e) => this.showModule(this.slytherinModule, e.target));
    document
      .querySelector("button.hufflepuff")
      .addEventListener("click", (e) => this.showModule(this.hufflepuffModule, e.target));
    document
      .querySelector("button.ravenclaw")
      .addEventListener("click", (e) => this.showModule(this.ravenclawModule, e.target));
    document
      .querySelector("button.favourites")
      .addEventListener("click", (e) => this.showModule(this.favouritesModule, e.target));
  }

  static getInstance() {
    if (!instance) {
      instance = new NavigationModule();
    }
    return instance;
  }

  showModule(module, button) {
    document
      .querySelector(".module-container:not(.hidden)")
      .classList.add("hidden");
    if (typeof module["show"] == "function") {
      module.show();
      this.setNavigationButtonActive(button)
    }
  }

  setNavigationButtonActive(button) {
    const activeButton = document.querySelector(
      "#nav-btns-container button.active"
    );
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    button.classList.add("active");
  }
}
