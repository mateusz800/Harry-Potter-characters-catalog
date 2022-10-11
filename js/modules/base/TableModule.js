import { TableRow } from "../../components/TableRow";
import DateUtils from "../../utils/DateUtils";
import CharacterDetailsModal from "../CharacterDetailsModal";
import { SortDirection } from "../../data/SortDirection";

class TableModule {
  tableContainer = document.querySelector("#table-container");
  dataTableBody = document.querySelector("#data-table tbody");

  charactersData = [];
  sortBy = null;
  sortDirection = SortDirection.default;
  currentCharacterIndex = 0;
  favouriteCharacters = [];

  show() {
    this.loadData().then((data) => {
      this.charactersData = data;
      this.updateTable(this.charactersData);
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

  updateTable(data) {
    this.dataTableBody.innerHTML = "";
    data.forEach((character) =>
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
        this.sortDirection == SortDirection.default
          ? SortDirection.asc
          : this.sortDirection == SortDirection.asc
          ? SortDirection.desc
          : SortDirection.default;
    }
    if (this.sortDirection != SortDirection.default) {
      headerItem.classList.add(this.sortDirection);
      const property = headerItem.getAttribute("data-param");
      const sortedData = [...this.charactersData].sort((elem1, elem2) => {
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
      this.updateTable(sortedData);
    } else {
      this.updateTable(this.charactersData);
    }

    
  }

  resetSortButton() {
    if (this.sortDirection != SortDirection.default) {
      const prevSortButton = document.querySelector(
        `.sortable.${this.sortDirection}`
      );
      if (prevSortButton != null) {
        prevSortButton.classList.remove(this.sortDirection);
      }
    }
  }
}

export default TableModule;
