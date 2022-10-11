export const Card = (character, favouritesRemoveFun) => {
  const container = document.createElement('div')
  container.classList.add("card", "flex-column");
  const image = character.image ? character.image : "./assets/blank-profile-picture.svg";
  container.innerHTML = `
  <div class="image" style="background-image: url('${image}')"></div>
  <h3>${character.name}</h3>`;
  const button = document.createElement('button');
  button.textContent = "Remove from favourites";
  button.addEventListener("click", () => favouritesRemoveFun(character))
  container.appendChild(button);
  return container;
}