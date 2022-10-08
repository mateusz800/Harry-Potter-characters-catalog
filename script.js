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

// DOM nodes
const body = document.querySelector("body");
const dataTableBody = document.querySelector("#data-table tbody");
const characterDetailsModal = document.querySelector(
  "#modal-character-details"
);
const studentButton = document.querySelector(
  "#nav-btns-container button:first-of-type"
);

// App state
const tableColumnsNames = [
  ...document.querySelectorAll("#data-table thead th"),
].map((column) => column.textContent);
let charactersData = [];
let sortBy = null;
let sortDirection = SortDirection.asc;

function init(){
  studentButton.click();
  document.querySelectorAll(".sortable").forEach((item) => {
    item.onclick = () => {
      toggleSortDirection(item);
      sortBy = item;
    };
  });
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

function fetchDataForButton(route, button) {
  fetchData(route);
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
  characterDetailsModal.classList.add("show");
  body.classList.add("modal-open");
  const image = character[character.length - 1].image;
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
}

function hideModal() {
  document.querySelector(".modal.show").classList.remove("show");
  body.classList.remove("modal-open");
}
