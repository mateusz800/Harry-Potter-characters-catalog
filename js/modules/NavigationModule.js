import { SortDirection } from "../data/SortDirection.js";
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
    window.onhashchange = (event) => {
      console.log(window.location.hash);
    }
    document
      .querySelector("button.students")
      .addEventListener("click", (e) =>
        this.showModule(this.allStudentsModule, e.target)
      );
    document
      .querySelector("button.gryffindor")
      .addEventListener("click", (e) =>
        this.showModule(this.gryffindorModule, e.target)
      );
    document
      .querySelector("button.slytherin")
      .addEventListener("click", (e) =>
        this.showModule(this.slytherinModule, e.target)
      );
    document
      .querySelector("button.hufflepuff")
      .addEventListener("click", (e) =>
        this.showModule(this.hufflepuffModule, e.target)
      );
    document
      .querySelector("button.ravenclaw")
      .addEventListener("click", (e) =>
        this.showModule(this.ravenclawModule, e.target)
      );
    document
      .querySelector("button.favourites")
      .addEventListener("click", (e) =>
        this.showModule(this.favouritesModule, e.target)
      );
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
    Object.entries(SortDirection).forEach((sort) => {
      if (sort[1] != SortDirection.default) {
        try{
          const elem = document.querySelector(`.sortable.${sort[1]}`).classList.remove(sort[1]);
        } catch(err){}
      }
    });
    if (typeof module["show"] == "function") {
      module.show();
      this.setNavigationButtonActive(button);
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
