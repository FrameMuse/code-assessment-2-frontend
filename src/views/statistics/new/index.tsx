import { Box, Typography } from "@mui/material"
import { StatisticsForm, StatisticsFormState } from "areas/statistics"
import { postStatistics } from "infrastructure/persistence/api/data/actions"
import { isValidResponse } from "infrastructure/persistence/api/helpers"
import { useClient } from "react-fetching-library"
import { toast } from "react-toastify"

function StatisticsNewView() {
  const client = useClient()

  async function onSubmit(state: StatisticsFormState) {
    const response = await client.query(postStatistics(state.values))
    if (!isValidResponse(response)) return

    toast.success("New entry created!")
  }

  return (
    <Box>
      <Typography sx={{ mb: 5 }} variant="h3" component="h3">Statistics</Typography>
      <Typography sx={{ mb: 2.5 }} variant="h5" component="h5">New entry</Typography>

      <StatisticsForm onSubmit={onSubmit} />
    </Box>
  )
}

export default StatisticsNewView
