const API_URL = "https://hp-api.herokuapp.com/api/characters";
const Route = {
  students: "/students",
  gryfindor: "/house/gryfindor",
  slytherin: "/house/slytherin",
  hufflepuff: "/house/hufflepuff",
  ravenclaw: "/house/ravenclaw",
};
const SortDirection = {
  asc: "asc",
  desc: "desc",
};

const LocalStorageKey = {
  favouriteCharacters : 'favourites'
}

const body = document.querySelector("body");
const tableContainer = document.querySelector('#table-container')
const dataTableBody = document.querySelector('#data-table tbody');
const favouriesContainer = document.querySelector('#favourites-container');
const characterDetailsModal = document.querySelector(
  "#modal-character-details"
);
const studentButton = document.querySelector(
  "#nav-btns-container button:first-of-type"
);

const tableColumnsNames = [
  ...document.querySelectorAll("#data-table thead th"),
].map((column) => column.textContent);
let charactersData = [];
let sortBy = null;
let sortDirection = SortDirection.asc;
let currentCharacterIndex = 0;
let favouriteCharacters = []

function init() {
  studentButton.click();
  document.querySelectorAll(".sortable").forEach((item) => {
    item.onclick = () => {
      toggleSortDirection(item);
      sortBy = item;
    };
  });
  updateFavouriteCharactersVariable()
}

function fetchData(route) {
  fetch(`${API_URL}/${route}`)
    .then((response) => response.json())
    .then((data) =>
      data.map((character) => [
        character.name,
        character.dateOfBirth,
        character.house,
        character.wizard,
        character.ancestry,
        (character.hogwartsStudent && "Student") ||
          (character.hogwartsStaff && "Staff") ||
          "Other",
        // additional data not displayed in table
        {
          image: character.image,
        },
      ])
    )
    .then((result) => {
      charactersData = result;
      updateTable();
    });
}

function retrieveRelevantData(route, button) {
  fetchData(route);
  tableContainer.classList.remove('hidden');
  favouriesContainer.classList.add('hidden');
  setNavigationButtonActive(button);
  resetSortButton();
  sortBy = null;
  sortDirection = SortDirection.asc;
}

function setNavigationButtonActive(button) {
  const activeButton = document.querySelector(
    "#nav-btns-container button.active"
  );
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  button.classList.add("active");
}

function toggleSortDirection(headerItem) {
  if (sortBy != null) {
    resetSortButton();
    sortDirection =
      sortDirection == SortDirection.asc
        ? SortDirection.desc
        : SortDirection.asc;
  }
  headerItem.classList.add(sortDirection);
  const propertyIndex = [
    ...document.querySelectorAll("#data-table th"),
  ].indexOf(headerItem);
  charactersData = charactersData.sort((elem1, elem2) => {
    const comparison = elem1[propertyIndex].localeCompare(elem2[propertyIndex]);
    return sortDirection == SortDirection.desc ? comparison : -comparison;
  });
  updateTable();
}

function resetSortButton() {
  const prevSortButton = document.querySelector(`.sortable.${sortDirection}`);
  if (prevSortButton != null) {
    prevSortButton.classList.remove(sortDirection);
  }
}

function updateTable() {
  const tableBody = charactersData
    .map(
      (character, index) =>
        `<tr onclick=showCharacterDetails(${index})> ${character
          .map((property, index) =>
            index < tableColumnsNames.length ? `<td>${property}</td>` : ""
          )
          .join("")}</tr>`
    )
    .join("");
  dataTableBody.innerHTML = tableBody;
}

function showCharacterDetails(characterIndex) {
  const character = charactersData[characterIndex];
  const image = character[character.length - 1].image;
  showModal();
  characterDetailsModal.querySelector(
    ".character-image"
  ).style.backgroundImage = `url(${
    image ? image : "./assets/blank-profile-picture.svg"
  })`;
  characterDetailsModal.querySelector(".name").innerHTML = character[0];
  characterDetailsModal.querySelector(".character-info-container").innerHTML =
    character
      .slice(1, character.length - 2)
      .map(
        (property, index) => `
        <div>
          <span>${tableColumnsNames[index + 1]} </span> : <span>${property}
        </div>
  `
      )
      .join("");
    currentCharacterIndex = characterIndex;
}

function showModal(){
   characterDetailsModal.classList.add("show");
  body.classList.add("modal-open");
}

function hideModal() {
  document.querySelector(".modal.show").classList.remove("show");
  body.classList.remove("modal-open");
}

function toggleFavourites(){
  console.log(favouriteCharacters);
  if(favouriteCharacters.includes(charactersData[currentCharacterIndex])){
    removeCharacterFromFavourites(charactersData[currentCharacterIndex]);
  } else {
    addCharacterToFavorites(charactersData[currentCharacterIndex]);
  }
}

function updateFavouriteCharactersVariable(){
  favouriteCharacters = JSON.parse(localStorage.getItem(LocalStorageKey.favouriteCharacters));
  if(!favouriteCharacters){
    favouriteCharacters = []
  }
}

function addCharacterToFavorites(character){
  if(!favouriteCharacters.includes(character)){
    favouriteCharacters.push(character);
  }
  localStorage.setItem(LocalStorageKey.favouriteCharacters, JSON.stringify(favouriteCharacters));
}

function removeCharacterFromFavourites(character){
  favouriteCharacters = favouriteCharacters.filter(item => item != character);
  localStorage.setItem(LocalStorageKey.favouriteCharacters, JSON.stringify(favouriteCharacters));
}

function showFavouriteCharacters(){
  tableContainer.classList.add('hidden');
  favouriesContainer.classList.remove('hidden');
  console.log(favouriteCharacters);
  favouriesContainer.innerHTML = favouriteCharacters.map(character => `
  <div class='card'>
    <h3>${character[0]}</h3>
  </div>
  `).join('');
}