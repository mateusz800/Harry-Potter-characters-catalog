import { SortDirection } from "../data/SortDirection";

export default class DateUtils {
  static convertToDate(textValue) {
    const stringDate = `${textValue.substr(6, 9)}-${textValue.substr(3,2)}-${textValue.substr(0,2)}`;
    return Date.parse(stringDate);
  }


  static compareDates(date1, date2, sortDirection){
    if(isNaN(date1)){
      return -1;
    } else if(isNaN(date2)){
      return 1
    }else {
      return date1 > date2 * sortDirection==SortDirection.asc? -1:1;
    }
  }
}
