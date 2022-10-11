export const TableRow = (character, onclick) => {
  let row = document.createElement("tr");
  row.addEventListener("click", function () {
    onclick();
  });
  row.innerHTML = `
        <td>${character.name}</td>
        <td>${character.dateOfBirth}</td>
        <td>${character.house}</td>
        <td>${character.wizard}</td>
        <td>${character.ancestry}</td>
        <td>${character.hogwartsRole}</td>
    `;
  return row;
};
