import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Price } from "utils/extensions"

import { StatisticsEntry } from "../../types"

export interface StatisticsTableProps {
  rows: StatisticsEntry[]
}

function StatisticsTable(props: StatisticsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a statistics table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Views</TableCell>
            <TableCell align="right">Clicks</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">CPC</TableCell>
            <TableCell align="right">CPM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.views}</TableCell>
              <TableCell align="right">{row.clicks}</TableCell>
              <TableCell align="right">{Price.format(row.cost, "en", "GBP")}</TableCell>
              <TableCell align="right">{row.cpc}</TableCell>
              <TableCell align="right">{row.cpm}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StatisticsTable
