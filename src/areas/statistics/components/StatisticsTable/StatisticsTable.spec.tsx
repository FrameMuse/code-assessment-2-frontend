import { render, screen } from "@testing-library/react"
import _ from "lodash"
import { Price } from "utils/extensions"

import { StatisticsEntryMock } from "../../mocks"
import StatisticsTable from "./StatisticsTable"

describe("StatisticsTable", () => {
  it("should have correct thead columns", async () => {
    render(<StatisticsTable rows={[]} />)

    const tableElement = await screen.findByRole("table")
    expect(tableElement).toBeDefined()
    expect(tableElement.querySelectorAll("thead > tr")).toHaveLength(1)

    expect(tableElement.querySelector("thead > tr > th:nth-child(1)")?.textContent).toBe("Date")
    expect(tableElement.querySelector("thead > tr > th:nth-child(2)")?.textContent).toBe("Views")
    expect(tableElement.querySelector("thead > tr > th:nth-child(3)")?.textContent).toBe("Clicks")
    expect(tableElement.querySelector("thead > tr > th:nth-child(4)")?.textContent).toBe("Cost")
    expect(tableElement.querySelector("thead > tr > th:nth-child(5)")?.textContent).toBe("CPC")
    expect(tableElement.querySelector("thead > tr > th:nth-child(6)")?.textContent).toBe("CPM")
  })

  it("should have correct tbody rows and columns", async () => {
    const randomClicks = _.random(1, 999)
    const rows = [StatisticsEntryMock, { ...StatisticsEntryMock, clicks: randomClicks }]
    render(<StatisticsTable rows={rows} />)

    const tableElement = await screen.findByRole("table")
    expect(tableElement).toBeDefined()
    expect(tableElement.querySelectorAll("tbody > tr")).toHaveLength(rows.length)

    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(1)")?.textContent).toBe(StatisticsEntryMock.date)
    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(2)")?.textContent).toBe(StatisticsEntryMock.views.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(3)")?.textContent).toBe(StatisticsEntryMock.clicks.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(4)")?.textContent).toBe(Price.format(StatisticsEntryMock.cost, "en", "GBP"))
    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(5)")?.textContent).toBe(StatisticsEntryMock.cpc.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(1) > td:nth-child(6)")?.textContent).toBe(StatisticsEntryMock.cpm.toString())

    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(1)")?.textContent).toBe(StatisticsEntryMock.date)
    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(2)")?.textContent).toBe(StatisticsEntryMock.views.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(3)")?.textContent).toBe(randomClicks.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(4)")?.textContent).toBe(Price.format(StatisticsEntryMock.cost, "en", "GBP"))
    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(5)")?.textContent).toBe(StatisticsEntryMock.cpc.toString())
    expect(tableElement.querySelector("tbody > tr:nth-child(2) > td:nth-child(6)")?.textContent).toBe(StatisticsEntryMock.cpm.toString())
  })
})
