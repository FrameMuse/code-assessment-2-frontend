import { StatisticsEntry } from "areas/statistics/types"

import { Action } from "../client.types"

export const getStatistics = (): Action<{ entries: StatisticsEntry[] }> => ({
  method: "GET",
  endpoint: "/statistics"
})

export const postStatistics = (body: {
  date: string
  views?: number
  clicks?: number
  cost?: number
}): Action => ({
  method: "POST",
  endpoint: "/statistics",
  body
})

export const deleteStatistics = (): Action => ({
  method: "DELETE",
  endpoint: "/statistics"
})
