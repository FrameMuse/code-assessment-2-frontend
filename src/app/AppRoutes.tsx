import { Route, Routes } from "react-router"
import ViewLayout from "ui/layouts/ViewLayout/ViewLayout"
import StatisticsView from "views/statistics"
import StatisticsNewView from "views/statistics/new"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<ViewLayout />}>
          <Route index element="Home" />
          <Route path="statistics">
            <Route index element={<StatisticsView />} />
            <Route path="new" element={<StatisticsNewView />} />
          </Route>
        </Route>
        <Route index element="Error 404 - Not Found" />
      </Route>
    </Routes>
  )
}

export default AppRoutes
