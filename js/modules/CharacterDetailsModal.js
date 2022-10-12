import { Character } from "../data/Character.js";
import CharacterRepository from "../repository/CharacterRepository.js";
import ModalModule from "./base/ModalModule.js";

export default class CharacterDetailsModal extends ModalModule {
  starButton;
  image = new Image();

  constructor(character) {
    super();
    this.character = character;
    this.isCharacterFavourite =
      CharacterRepository.getFavourites().filter((item) =>
        Character.isEqual(this.character, item)
      ).length > 0;
  }

  setContent() {
    this.contentNode.innerHTML = `
        <div class="flex-row mobile-flex-column">
           <div class="flex-column align-center">
              <div class="character-image" style="background-image: url(${
                this.character.image
                  ? "../assets/loading.gif"
                  : "../assets/blank-profile-picture.svg"
              })">
              </div>
              <div class="star-btn
              ${
                this.isCharacterFavourite ? "active" : "noactive"
              }">&starf;</div>
              <div class="character-name"><span>${
                this.character.name
              }</span></div>
            </div>
            <div>
            <div class="character-info-container">
              <h3>Character details</h3>
              <table>
                <tr>
                  <td>Date of birth</td> 
                  <td>${this.character.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>House</td> 
                  <td>${this.character.house}</td>
                </tr>
                <tr>
                  <td>Wizard</td> 
                  <td>${this.character.wizard}</td>
                </tr>
                <tr>
                  <td>Ancestry</td> 
                  <td>${this.character.ancestry}</td>
                </tr>
                <tr>
                  <td>Is student/staff</td> 
                  <td>${this.character.hogwartsRole}</td>
                </tr>
              </table>
            </div>
        </div>`;
    if (this.character.image) {
      const image = new Image();
      image.onload = function () {
        document.querySelector(".modal-content .character-image").style.backgroundImage = `url('${image.src}')`;
      };
      image.src = this.character.image;
    }
    this.starButton = document.querySelector(
      "#modal-character-details .star-btn"
    );
    this.starButton.addEventListener("click", () => this.toggleFavourites());
  }

  toggleFavourites() {
    if (this.isCharacterFavourite) {
      CharacterRepository.removeFromFavourites(this.character);
      this.isCharacterFavourite = false;
      if (this.starButton) {
        this.starButton.classList.remove("active");
      }
    } else {
      CharacterRepository.addToFavourites(this.character);
      this.isCharacterFavourite = true;
      if (this.starButton) {
        this.starButton.classList.add("active");
      }
    }
  }
}
