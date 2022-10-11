import { TableRow } from "../../components/TableRow";
import DateUtils from "../../utils/DateUtils";
import CharacterDetailsModal from "../CharacterDetailsModal";
import { SortDirection } from "../../data/SortDirection";



class TableModule {
  tableContainer = document.querySelector("#table-container");
  dataTableBody = document.querySelector("#data-table tbody");

  charactersData = [];
  sortBy = null;
  sortDirection = SortDirection.asc;
  currentCharacterIndex = 0;
  favouriteCharacters = [];

  show() {
    this.loadData().then((data) => {
      this.charactersData = data;
      this.updateTable();
      document.querySelectorAll(".sortable").forEach((item) => {
        item.onclick = () => {
          this.toggleSortDirection(item);
          this.sortBy = item;
        };
      });
    });

    this.sortBy = null;
    this.sortDirection = SortDirection.asc;
    this.tableContainer.classList.remove("hidden");
  }

  async loadData() {
    throw new Error("loadData() function not implemented");
  }

  updateTable() {
    this.dataTableBody.innerHTML = "";
    this.charactersData.forEach((character) =>
      this.dataTableBody.appendChild(
        TableRow(character, () => this.showModal(character))
      )
    );
  }

  showModal(character) {
    new CharacterDetailsModal(character).show();
  }

  toggleSortDirection(headerItem) {
    if (this.sortBy != null) {
      this.resetSortButton();
      this.sortDirection =
        this.sortDirection == SortDirection.asc
          ? SortDirection.desc
          : SortDirection.asc;
    }
    headerItem.classList.add(this.sortDirection);
    const property = headerItem.getAttribute("data-param");
    this.charactersData = this.charactersData.sort((elem1, elem2) => {
      let comparison;

      switch (headerItem.getAttribute("data-type")) {
        case "date":
          return DateUtils.compareDates(
            DateUtils.convertToDate(elem1[property]),
            DateUtils.convertToDate(elem2[property]),
            this.sortDirection
          );
          break;
        default:
          comparison = elem1[property].localeCompare(elem2[property]);
      }
      return this.sortDirection == SortDirection.desc
        ? -comparison
        : comparison;
    });

    this.updateTable();
  }

  resetSortButton() {
    const prevSortButton = document.querySelector(
      `.sortable.${this.sortDirection}`
    );
    if (prevSortButton != null) {
      prevSortButton.classList.remove(this.sortDirection);
    }
  }
}

export default TableModule;
