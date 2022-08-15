import { AppBar, Box, Container } from "@mui/material"

import NavigationButtonLink from "./NavigationButtonLink"

function Navigation() {
  return (
    <nav className="navigation">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavigationButtonLink to="/">Home</NavigationButtonLink>
            <NavigationButtonLink to="/statistics">Statistics</NavigationButtonLink>
          </Box>
        </Container>
      </AppBar>
    </nav>
  )
}

export default Navigation
