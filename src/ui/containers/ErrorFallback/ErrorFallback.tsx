import "./ErrorFallback.scss"

import { ErrorInfo } from "react"

import { ErrorBoundaryError, ErrorBoundaryReset } from "../ErrorBoundary/ErrorBoundary.types"
import FatalError from "./FatalError"

function ErrorFallback(reset: ErrorBoundaryReset, error?: ErrorBoundaryError, errorInfo?: ErrorInfo) {
  return (
    <FatalError reset={reset} error={error} errorInfo={errorInfo} />
  )
}

export default ErrorFallback
