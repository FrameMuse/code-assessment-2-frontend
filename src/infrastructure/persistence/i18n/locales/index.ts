import { ExtractArrayType } from "types"

import LocaleResourceSchemaJson from "./schema.json"

export const supportedLocales = ["ru", "en"] as const

export type LocaleKeys = ExtractArrayType<typeof supportedLocales> | "dev"
export type LocaleResourceSchema = typeof LocaleResourceSchemaJson
