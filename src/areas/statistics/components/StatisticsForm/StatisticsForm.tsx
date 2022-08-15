import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import { FormEvent, useState } from "react"
import Form, { FormState, FormSubmit } from "ui/Form/Form"

enum StatisticsFormFields {
  date = "date",
  views = "views",
  clicks = "clicks",
  cost = "cost"
}

interface StatisticsFormValues {
  date: string
  views: number
  clicks: number
  cost: number
}

export type StatisticsFormState = FormState<StatisticsFormFields, StatisticsFormValues>

export interface StatisticsFormProps {
  onSubmit?: FormSubmit<StatisticsFormFields, StatisticsFormValues>
}

function StatisticsForm(props: StatisticsFormProps) {
  const [date, setDate] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(state: StatisticsFormState, event: FormEvent<HTMLFormElement>) {
    setLoading(true)
    await props.onSubmit?.(state, event)
    setLoading(false)
  }
  return (
    <Form style={{ display: "flex", gap: "1em" }} onSubmit={onSubmit}>
      <DesktopDatePicker
        label="Date"
        inputFormat="YYYY-MM-DD"
        value={date}
        onChange={setDate}
        renderInput={(params) => <TextField {...params} name={StatisticsFormFields.date} required />}
      />
      <input type="hidden" value={date ?? ""} />

      <TextField name={StatisticsFormFields.views} type="number" label="Views" defaultValue="0" />
      <TextField name={StatisticsFormFields.clicks} type="number" label="Clicks" defaultValue="0" />
      <TextField name={StatisticsFormFields.cost} type="number" label="Cost" defaultValue="0" />

      <LoadingButton sx={{ paddingInline: "2.5em" }} type="submit" variant="contained" loading={loading}>Submit</LoadingButton>
    </Form>
  )
}

export default StatisticsForm
