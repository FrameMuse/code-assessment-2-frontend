import { LoadingButton } from "@mui/lab"
import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { StatisticsTable } from "areas/statistics"
import { deleteStatistics, getStatistics } from "infrastructure/persistence/api/data/actions"
import { isValidResponse } from "infrastructure/persistence/api/helpers"
import { useState } from "react"
import { useClient, useQuery } from "react-fetching-library"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"

function StatisticsView() {
  const [loadingButton, setLoadingButton] = useState(false)

  const client = useClient()
  const { payload, loading, query } = useQuery(getStatistics())

  async function clearStatistics() {
    setLoadingButton(true)
    const response = await client.query(deleteStatistics())
    setLoadingButton(false)

    if (!isValidResponse(response)) return

    query()
    toast.success("Statistics cleared!")
  }

  return (
    <Box>
      <Typography sx={{ mb: 5 }} variant="h3" component="h3">Statistics</Typography>
      <Typography variant="h5" component="h5">Entries</Typography>

      <Button sx={{ my: 2.5 }} component={NavLink} to="new">New entry</Button>
      <LoadingButton sx={{ ml: 1, my: 2.5 }} color="error" variant="contained" onClick={clearStatistics} loading={loadingButton}>Clear statistics</LoadingButton>

      {loading && <CircularProgress sx={{ display: "block" }} />}
      {payload && <StatisticsTable rows={payload.entries} />}
    </Box>
  )
}

export default StatisticsView
