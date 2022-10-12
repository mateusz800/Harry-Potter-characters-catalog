import CharacterRepository from "../repository/CharacterRepository.js";

export default class FavouritesModule {
  loader = document.querySelector(".loader-container");
  container = document.querySelector("#favourites-container");
  cardsContainer = this.container.querySelector(".cards-container");
  selectNode = this.container.querySelector("select[name=cards-in-row]");
  cardsInRow = parseInt(this.selectNode.value);
  data = [];

  constructor() {
    this.cardsContainer.style.gridTemplateColumns = `repeat(${this.cardsInRow}, 1fr)`;
    this.selectNode.addEventListener("change", () => {
      this.cardsInRow = parseInt(this.selectNode.value);
      this.adjustWidth();
      this.cardsContainer.style.gridTemplateColumns = `repeat(${this.cardsInRow}, 1fr)`;
    });
  }

  show() {
    this.container.classList.remove("hidden");
    this.data = CharacterRepository.getFavourites();
    if (this.data.length > 0) {
      const infoNode = this.container.querySelector('p');
      if(infoNode){
        infoNode.remove();
      }
      const tempNode = document.createElement("div");
      this.data.forEach((character) =>
        tempNode.appendChild(Card(character))
      );
      if (tempNode.innerHTML != this.cardsContainer.innerHTML) {
        this.cardsContainer.innerHTML = "";
        tempNode.childNodes.forEach((node, index) => {
          const image = new Image();
          const clone = node.cloneNode(true)
          this.cardsContainer.appendChild(clone);
          clone.querySelector('button').addEventListener('click', () => {
            this.removeFromFavourites(this.data[index])
          })
          image.onload = function () {
            clone.querySelector(
              ".image"
            ).style.backgroundImage = `url('${image.src}')`;
          };
          const source = this.data[index].image;
          image.src = source ? source : "../assets/blank-profile-picture.svg";
        });
      }
      this.adjustWidth();
    } else {
      if(!this.container.querySelector('p')){
        const infoNode = document.createElement('p');
        infoNode.textContent = "Your favourite characters list is empty";
        this.container.appendChild(infoNode);
      }
      this.cardsContainer.innerHTML = "";
    }

    this.loader.classList.add("hidden");
  }

  adjustWidth() {
    const card = this.cardsContainer.querySelector(".card");
    if (card) {
      const cardStyle = getComputedStyle(card);
      const marginLeft = parseInt(cardStyle.marginLeft);
      const marginRight = parseInt(cardStyle.marginRight);
      this.cardsContainer.style.width =
        (card.offsetWidth + marginLeft + marginRight) * this.cardsInRow + "px";
    }
  }

  removeFromFavourites(character) {
    this.data = CharacterRepository.removeFromFavourites(character);
    this.show();
  }
}

const Card = (character) => {
  const container = document.createElement("div");
  container.classList.add("card", "flex-column");
  container.innerHTML = `
  <div class="image" style="background-image: url('../assets/loading.gif')"></div>
  <h3>${character.name}</h3>`;
  const button = document.createElement("button");
  button.textContent = "Remove from favourites";
  container.appendChild(button);
  return container;
};
