const API_URL = "https://hp-api.herokuapp.com/api";
const SORT_DIRECTION = {
  Asc: "asc",
  Desc: "desc",
};
const dataTableBody = document.querySelector("#data-table tbody");
let charactersData = [];
let sortBy = null;
let sortDirection = SORT_DIRECTION.Asc;

window.addEventListener("load", function () {
  fetchData().then((data) => {
    charactersData = data;
    updateTable(charactersData);
  });
  document.querySelectorAll(".sortable").forEach((item) => {
    item.onclick = () => {
      toggleSortDirection(item);
      sortBy = item;
    };
  });
});

async function fetchData() {
  return fetch(`${API_URL}/characters`)
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
      ])
    );
}

function toggleSortDirection(headerItem) {
  if (sortBy != null) {
    const prevSortButton = document.querySelector(
      `.sortable.${sortDirection}`
    );
    if (prevSortButton != null) {
      prevSortButton.classList.remove(sortDirection);
    }
    sortDirection =
      sortDirection == SORT_DIRECTION.Asc
        ? SORT_DIRECTION.Desc
        : SORT_DIRECTION.Asc;
  }
  headerItem.classList.add(sortDirection);
  const propertyIndex = [...document.querySelectorAll('#data-table th')].indexOf(headerItem);
  updateTable(
    charactersData.sort(
      (elem1, elem2) => {
        const comparison = elem1[propertyIndex].localeCompare(elem2[propertyIndex])
        return sortDirection==SORT_DIRECTION.Desc? comparison:-comparison
      }
    )
  );
}

function updateTable(data) {
  const tableBody = data
    .map(
      (character) =>
        `<tr> ${character
          .map((property) => `<td>${property}</td>`)
          .join("")}</tr>`
    )
    .join("");
  dataTableBody.innerHTML = tableBody;
}