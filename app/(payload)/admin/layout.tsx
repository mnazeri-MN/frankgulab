import type React from "react"
import "@payloadcms/next/css"
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts"
import type { ServerFunctionClient } from "payload"
import { importMap } from "./importMap.js"

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  "use server"
  return handleServerFunctions({
    ...args,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: import("@payload-config").then((m) => m.default) as any,
    importMap,
  })
}

export default function Layout({ children }: Args) {
  return (
    <>
      {/* DEBUG: remove once toolbar issue is resolved */}
      <style>{`
        .fixed-toolbar { outline: 3px solid red !important; background: yellow !important; min-height: 20px !important; display: flex !important; visibility: visible !important; opacity: 1 !important; }
      `}</style>
      {RootLayout({
        children,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: import("@payload-config").then((m) => m.default) as any,
        importMap,
        serverFunction,
      })}
    </>
  )
}
