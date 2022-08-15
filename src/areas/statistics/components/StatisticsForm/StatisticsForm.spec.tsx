import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { fireEvent, render, screen } from "@testing-library/react"
import { ToastContainer } from "react-toastify"

import StatisticsForm from "./StatisticsForm"

describe("StatisticsForm", () => {
  it("should have correct inputs", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StatisticsForm />
      </LocalizationProvider>
    )

    const dateInputElement = screen.getByPlaceholderText("yyyy-mm-dd") as HTMLInputElement
    expect(dateInputElement).toBeInstanceOf(HTMLInputElement)
    expect(dateInputElement.type).toBe("tel")
    expect(dateInputElement.name).toBe("date")
    expect(dateInputElement.required).toBe(true)

    const viewsInputElement = screen.getByLabelText("Views") as HTMLInputElement
    expect(viewsInputElement).toBeInstanceOf(HTMLInputElement)
    expect(viewsInputElement.type).toBe("number")
    expect(viewsInputElement.name).toBe("views")
    expect(viewsInputElement.required).toBe(false)

    const clicksInputElement = screen.getByLabelText("Clicks") as HTMLInputElement
    expect(clicksInputElement).toBeInstanceOf(HTMLInputElement)
    expect(clicksInputElement.type).toBe("number")
    expect(clicksInputElement.name).toBe("clicks")
    expect(clicksInputElement.required).toBe(false)

    const costInputElement = screen.getByLabelText("Cost") as HTMLInputElement
    expect(costInputElement).toBeInstanceOf(HTMLInputElement)
    expect(costInputElement.type).toBe("number")
    expect(costInputElement.name).toBe("cost")
    expect(costInputElement.required).toBe(false)
  })

  it("should have correct date input", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StatisticsForm />
        <ToastContainer />
      </LocalizationProvider>
    )

    const dateInputElement = screen.getByLabelText("Date *") as HTMLInputElement
    fireEvent.change(dateInputElement, { target: { value: "2002-12-20" } })
    expect(dateInputElement.value).toBe("2002-12-20")
  })

  it("should have not disabled button for empty date input", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StatisticsForm />
      </LocalizationProvider>
    )

    const buttonElement = screen.getByText("Submit") as HTMLButtonElement
    expect(buttonElement.disabled).toBe(false)
    fireEvent.click(buttonElement)
    expect(buttonElement.disabled).toBe(false)
  })

  it("should have disabled button for filled date input", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StatisticsForm />
        <ToastContainer />
      </LocalizationProvider>
    )

    const dateInputElement = screen.getByLabelText("Date *") as HTMLInputElement
    fireEvent.change(dateInputElement, { target: { value: "2002-12-20" } })

    const buttonElement = screen.getByText("Submit") as HTMLButtonElement
    expect(buttonElement.disabled).toBe(false)
    fireEvent.click(buttonElement)
    setTimeout(() => {
      expect(buttonElement.disabled).toBe(true)
      expect(screen.getByText("New entry created!")).toBeDefined()
    })
  })
})
