export class Price {
  /**
   * Converts a number to price formatted string
   * @returns error message for error
   */
  static format(value: number, locale = "EN", currency = "USD"): string {
    try {
      // Replace all non-standard spaces to standard
      return value.toLocaleString(locale, { style: "currency", currency, minimumFractionDigits: 0 }).replace(/\s/g, " ")
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("tag") || error.message.includes("locale")) {
          return "Invalid language tag"
        }

        return "Invalid currency code"
      }

      throw error
    }
  }
}


export default {}
