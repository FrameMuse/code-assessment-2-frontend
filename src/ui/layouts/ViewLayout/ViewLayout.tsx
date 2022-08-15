import "./ViewLayout.scss"

import { Box } from "@mui/material"
import Header from "areas/header/Header"
import { ReactNode } from "react"
import { Outlet } from "react-router"

interface ViewLayoutProps {
  children?: ReactNode
}

function ViewLayout(props: ViewLayoutProps) {
  return (
    <div className="view-layout">
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        {props.children || <Outlet />}
      </Box>
    </div>
  )
}

export default ViewLayout
