import { Button } from "@mui/material"
import { ErrorInfo } from "react"

import { ErrorBoundaryError, ErrorBoundaryReset } from "../ErrorBoundary/ErrorBoundary.types"

interface FatalErrorProps {
  reset: ErrorBoundaryReset
  error?: ErrorBoundaryError
  errorInfo?: ErrorInfo
}

function FatalError(props: FatalErrorProps) {
  function sendReport() {
    const error = props.error
    if (error == null) return

    // ... report service
  }
  return (
    <div className="error-view">
      <div className="error-view__container">
        <h1>FATAL</h1>
        <div className="error-view__desc">
          <h3>Unexpected error</h3>
          <p>Name:</p>
          <pre>{props.error?.name}</pre>
          <p>Message:</p>
          <pre>{props.error?.message}</pre>
          <p>Log:</p>
          <pre>{props.error?.stack}</pre>
          <p>Component Log:</p>
          <pre>{props.errorInfo?.componentStack}</pre>
        </div>
        <Button onClick={sendReport}>Send report</Button>
        <Button onClick={props.reset}>Try again</Button>
      </div>
    </div>
  )
}

export default FatalError
