import { DateTime } from 'luxon'
export class RotaryYear {
  private static currentYear: string

  public static getCurrentYear(): string {
    const DateArray = DateTime.now().toObject()
    this.currentYear = DateArray.year.toString()
    return String(this.currentYear)
  }
  public static getYears(currentYear: number): string[] {
    let firstYear: number = 2020
    let diffrence = currentYear - firstYear + 1
    let years = [] as string[]
    for (let index = 0; index < diffrence; index++) {
      years[index] = firstYear.toString()
      firstYear++
    }
    return years
  }
}
