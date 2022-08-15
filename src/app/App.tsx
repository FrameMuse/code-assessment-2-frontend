// MUI Fonts
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
// Base SCSS
import "assets/scss/base.scss"
// Toast Styles
import "react-toastify/scss/main.scss"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import ClientAPI from "infrastructure/persistence/api/client"
import store from "infrastructure/persistence/redux/store"
import { ReactNode, Suspense } from "react"
import { ClientContextProvider } from "react-fetching-library"
import { ModalContainer } from "react-modal-global"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
/* --- Containers --- */
import CookiesNotice from "ui/containers/CookiesNotice/CookiesNotice"
import ErrorBoundary from "ui/containers/ErrorBoundary/ErrorBoundary"
import ErrorFallback from "ui/containers/ErrorFallback/ErrorFallback"

import AppRoutes from "./AppRoutes"

function App() {
  return (
    <AppProviders>
      <Suspense fallback="Loading...">
        <ErrorBoundary fallback={ErrorFallback}>
          <AppRoutes />
          <CookiesNotice />
          <ModalContainer />
          <ToastContainer />
        </ErrorBoundary>
      </Suspense>
    </AppProviders>
  )
}

function AppProviders(props: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ClientContextProvider client={ClientAPI}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {props.children}
          </LocalizationProvider>
        </ClientContextProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
