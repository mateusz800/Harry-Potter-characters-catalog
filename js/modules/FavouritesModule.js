import CharacterRepository from "../repository/CharacterRepository";
import { Card } from "../components/Card";

export default class FavouritesModule {
  container = document.querySelector("#favourites-container");
  cardsContainer = this.container.querySelector(".cards-container");
  selectNode = this.container.querySelector("select[name=cards-in-row]");
  cardsInRow = parseInt(this.selectNode.value);
  data = []

  constructor() {
    this.cardsContainer.style.gridTemplateColumns = `repeat(${this.cardsInRow}, 1fr)`;
    this.selectNode.addEventListener(
      "change",
      () => {
        this.cardsInRow = parseInt(this.selectNode.value);
        this.adjustWidth();
        this.cardsContainer.style.gridTemplateColumns = `repeat(${this.cardsInRow}, 1fr)`;
      }
    );
  }

  show() {
    this.container.classList.remove("hidden");
    this.data = CharacterRepository.getFavourites();
    this.cardsContainer.innerHTML = "";
    this.data.forEach(character => this.cardsContainer.appendChild(Card(character, (character) => this.removeFromFavourites(character))));
    this.adjustWidth();
  }

  adjustWidth() {
    const card = this.cardsContainer.querySelector(".card");
    const cardStyle = getComputedStyle(card);
    const marginLeft = parseInt(cardStyle.marginLeft);
    const marginRight = parseInt(cardStyle.marginRight);
    console.log(this.cardsInRow)
    console.log(card.offsetWidth)
    console.log((card.offsetWidth + marginLeft + marginRight) * this.cardsInRow + "px");
    this.cardsContainer.style.width =
      (card.offsetWidth + marginLeft + marginRight) * this.cardsInRow + "px";
  }

  removeFromFavourites(character){
    console.log(character);
    CharacterRepository.removeFromFavourites(character);
    const characterIndex = this.data.indexOf(character)
    this.cardsContainer.querySelectorAll('.card')[characterIndex].remove();

  }
}
