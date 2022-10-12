import { Character } from "../data/Character.js";

const API_URL = "https://hp-api.herokuapp.com/api/characters";

export default class CharacterRepository {

  constructor() {
    if (this instanceof StaticClass) {
      throw Error('A static class cannot be instantiated.');
    }
  }

  static async getStudents() {
    return this.fetchData("students");
  }

  static async getGryffindor() {
    return this.fetchData("house/gryffindor");
  }

  static async getSlytherin(){
    return this.fetchData("house/slytherin");
  }

  static async getHufflepuff(){
    return this.fetchData("house/hufflepuff");
  }

  static async getRavenclaw(){
    return this.fetchData("house/ravenclaw");
  }

  static getFavourites() {
    let data = JSON.parse(localStorage.getItem('favourites', '[]'));
    return data ? data : [];
  }

  static addToFavourites(character) {
    let favourites = this.getFavourites();
    if(favourites.filter(item => Character.isEqual(item, character)).length == 0){
      favourites.push(character);
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  static removeFromFavourites(character) {
    let favourites = this.getFavourites();
    favourites = favourites.filter(item => !Character.isEqual(item, character));
    localStorage.setItem('favourites', JSON.stringify(favourites));
    return favourites;
  }

  static async fetchData(route) {
    return fetch(`${API_URL}/${route}`)
      .then((response) => {
        if(response.ok){
          return response.json()
        } else {
          alert("Failed to fetch data");
          return [];
        }
      }).then(data => this.adjustData(data) );
  }

  static async adjustData(data) {
    return data.map(
      (character) =>
        new Character(
          character.name,
          character.dateOfBirth,
          character.house,
          character.wizard,
          character.ancestry,
          Character.calculateHogwartsRole(character),
          character.image
        )
    );
  }
}
