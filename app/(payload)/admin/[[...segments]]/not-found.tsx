export const dynamic = "force-dynamic"

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default async function NotFound({ params, searchParams }: Args) {
  const { NotFoundPage } = await import("@payloadcms/next/views")
  const { importMap } = await import("../importMap.js")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = import("@payload-config").then((m) => m.default) as any
  return NotFoundPage({ config, params, searchParams, importMap })
}
