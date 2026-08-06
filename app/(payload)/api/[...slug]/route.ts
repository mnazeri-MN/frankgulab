export const dynamic = "force-dynamic"

type Ctx = { params: Promise<Record<string, string | string[]>> }

const config = import("@payload-config").then((m) => m.default) as any

export async function GET(req: Request, ctx: Ctx) {
  const { REST_GET } = await import("@payloadcms/next/routes")
  return (REST_GET as any)(config)(req, ctx)
}

export async function POST(req: Request, ctx: Ctx) {
  const { REST_POST } = await import("@payloadcms/next/routes")
  return (REST_POST as any)(config)(req, ctx)
}

export async function DELETE(req: Request, ctx: Ctx) {
  const { REST_DELETE } = await import("@payloadcms/next/routes")
  return (REST_DELETE as any)(config)(req, ctx)
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { REST_PATCH } = await import("@payloadcms/next/routes")
  return (REST_PATCH as any)(config)(req, ctx)
}
