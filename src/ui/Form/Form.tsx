import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react"
import { FileToURLDataBase64 } from "utils/common"

type FormValue = string | string[] | number | number[] | boolean | null | undefined
type FormValues = Record<string, FormValue>

export interface FormState<K extends keyof never, V extends Record<K, unknown>> { // Type-safe Values
  keys: K[]
  values: V extends { [P in K]?: unknown } ? Pick<V, K> & Record<Exclude<keyof V, K>, unknown> : Record<K, V>
}

export type FormSubmit<K extends keyof never, V extends Record<K, unknown>> = (state: FormState<K, V>, event: FormEvent<HTMLFormElement>) => void | Promise<void>

interface FormProps<K extends keyof never, V extends Record<K, unknown>> extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "onSubmit"> {
  onSubmit?: FormSubmit<K, V>
}

function Form<K extends keyof never, V extends Record<K, unknown>>(props: FormProps<K, V>) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formState = await getFormState(event.currentTarget.elements) as unknown as FormState<K, V>

    props.onSubmit?.(formState, event)
  }
  return (
    <form {...props} onSubmit={onSubmit} />
  )
}

async function getFormState(elements: HTMLFormControlsCollection): Promise<{
  keys: string[]
  values: FormValues
}> {
  const keys: string[] = []
  for (const element of elements) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      if (keys.includes(element.name)) continue
      // console.log(element.name)
      keys.push(element.name)
    }
  }

  const values: FormValues = {}
  for (const key of keys) {
    const element = elements.namedItem(key)

    if (element instanceof NodeList) {
      const inputs = [...element] as HTMLInputElement[]
      const inputValues = inputs.filter(input => {
        if (["checkbox", "radio"].includes(input.type)) {
          return input.checked && input.value !== "on"
        }
        return true
      }).map(input => input.value)

      values[inputs[0].name] = inputValues.flatMap(check => isNaN(Number(check)) ? [] : Number(check))
      continue
    }

    if (element instanceof HTMLInputElement) {
      if (element.checked) {
        if (element.type === "checkbox" && element.value !== "on") {
          values[element.name] = [element.value]
          continue
        }

        values[element.name] = true
        continue
      }

      const file = element.files?.[0]
      if (file instanceof File) {
        values[element.name] = await FileToURLDataBase64(file)
        continue
      }
    }

    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      if (element.value.length === 0) continue
      values[element.name] = isNaN(Number(element.value)) ? element.value : Number(element.value)
      continue
    }
  }

  return { keys, values }
}

export default Form
