import type { Metadata } from "next"
import { RootPage, generatePageMetadata } from "@payloadcms/next/views"
import { importMap } from "../importMap.js"

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config: import("@payload-config").then((m) => m.default) as any, params, searchParams })

export default function Page({ params, searchParams }: Args) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return RootPage({ config: import("@payload-config").then((m) => m.default) as any, params, searchParams, importMap })
}
