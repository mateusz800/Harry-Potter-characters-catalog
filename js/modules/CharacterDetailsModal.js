import CharacterRepository from "../data/CharacterRepository";
import ModalModule from "./base/ModalModule";

export default class CharacterDetailsModal extends ModalModule {
  constructor(character) {
    super()
    this.character = character;
    this.isCharacterFavourite =
      CharacterRepository.getFavourites().includes(character);
  }

  setContent() {
    this.contentNode.innerHTML = `
        <div class="flex-row">
            <div class="character-image" style="background-image: url(${
              this.character.image
            })">
                <button class="star 
                ${this.isCharacterFavourite ? "active" : ""}"
                 onclick="${this.toggleFavourites()}">&star;</button>
            </div>
            <div>
                <h2>${this.character.name}</h2>
            <div class="character-info-container"></div>
        </div>`;
  }

  toggleFavourites() {
    if (this.isCharacterFavourite) {
      CharacterRepository.removeFromFavourites(this.character);
      this.isCharacterFavourite = false;
    } else {
      CharacterRepository.addToFavourites(this.character);
      this.isCharacterFavourite = true;
    }
  }
}
