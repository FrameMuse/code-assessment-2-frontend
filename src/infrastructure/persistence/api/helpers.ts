import { QueryResponse } from "react-fetching-library"

export function isValidResponse<T>(response: QueryResponse<T>, throwError = false): response is Required<typeof response> {
  if (response.error) {
    if (throwError) {
      throw response.errorObject
    }

    return false
  }

  if (response.headers == null || response.status == null) {
    return false
  }

  return true
}
