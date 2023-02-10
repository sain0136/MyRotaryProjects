import { DateTime } from "luxon";
export default class RotaryYear {
  private static currentYear: string;

  constructor() {}

  /**
   * @returns string
   */
  public static getCurrentYear(): string {
    this.currentYear = DateTime.now().year.toString();
    return this.currentYear;
  }

  /**
   * @desc calculates the number of years between the current year and the year 2020.
   * It then creates an array of strings, representing each year between the
   * two dates and returns the array.
   * @param  {number} currentYear
   * @returns string
   */
  public static getYears(currentYear: number): string[] {
    let firstYear: number = 2020;
    let diffrence: number = currentYear - firstYear + 1;
    let years: Array<string> = [];
    for (let i = 0; i < diffrence; i++) {
      years[i] = firstYear.toString().concat("-" + (firstYear + 1));
      firstYear++;
    }
    return years;
  }
}
