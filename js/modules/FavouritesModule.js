import CharacterRepository from "../data/CharacterRepository";
import { Card } from "../components/Card";

export default class FavouritesModule {
  container = document.querySelector("#favourites-container");

  show() {
    this.container.classList.remove("hidden");
    const data = CharacterRepository.getFavourites();
    this.container.innerHTML = data
      .map((character) => Card(character))
      .join("");
  }
}
