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

  studentButton = document.querySelector("button.students");

  constructor() {
    const gryffindorButton = document.querySelector("button.gryffindor");
    const slytherinButton = document.querySelector("button.slytherin");
    const hufflepuffButton = document.querySelector("button.hufflepuff");
    const ravenclawButton = document.querySelector("button.ravenclaw");
    const favouritesButton = document.querySelector("button.favourites");

    this.studentButton.addEventListener("click", (e) =>
      this.showModule(this.allStudentsModule, e.target)
    );

    gryffindorButton.addEventListener("click", (e) =>
      this.showModule(this.gryffindorModule, e.target)
    );
    slytherinButton.addEventListener("click", (e) =>
      this.showModule(this.slytherinModule, e.target)
    );
    hufflepuffButton.addEventListener("click", (e) =>
      this.showModule(this.hufflepuffModule, e.target)
    );
    ravenclawButton.addEventListener("click", (e) =>
      this.showModule(this.ravenclawModule, e.target)
    );
    favouritesButton.addEventListener("click", (e) =>
      this.showModule(this.favouritesModule, e.target)
    );
    let chosenButton = this.studentButton;
    const lastModule = localStorage.getItem('last-module');
    document
      .querySelectorAll("#nav-btns-container button")
      .forEach((button) => {
        if (
          this.buildRouteBasedOnTextContent(button) == lastModule
        ) {
          chosenButton = button;
          return;
        }
      });
      chosenButton.click();
  }

  static getInstance() {
    if (!instance) {
      instance = new NavigationModule();
    }
    return instance;
  }

  showModule(module, button) {
    const previousModule = document.querySelector(
      ".module-container:not(.hidden)"
    );
    if (previousModule) {
      previousModule.classList.add("hidden");
    }

    Object.entries(SortDirection).forEach((sort) => {
      if (sort[1] != SortDirection.default) {
        try {
          const elem = document
            .querySelector(`.sortable.${sort[1]}`)
            .classList.remove(sort[1]);
        } catch (err) {}
      }
    });
    if (typeof module["show"] == "function") {
      module.show();
      this.setNavigationButtonActive(button);
      localStorage.setItem('last-module', this.buildRouteBasedOnTextContent(button));
    }
  }

  buildRouteBasedOnTextContent(button) {
    return `${button.textContent.replace(" ", "")}`.toLowerCase();
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
