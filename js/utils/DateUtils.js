
export default class DateUtils {
  static convertToYearMonthDay(textValue) {
    const stringDate = `${textValue.substr(6, 9)}-${textValue.substr(3,2)}-${textValue.substr(0,2)}`;
    return stringDate;
  }
}
