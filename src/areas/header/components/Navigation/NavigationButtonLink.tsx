import { Button } from "@mui/material"
import { ReactNode } from "react"
import { NavLink } from "react-router-dom"

export interface NavigationButtonLinkProps {
  to: string
  children: ReactNode
}

function NavigationButtonLink(props: NavigationButtonLinkProps) {
  return (
    <Button sx={{ my: 2, color: "white" }} component={NavLink} to={props.to}>{props.children}</Button>
  )
}

export default NavigationButtonLink
