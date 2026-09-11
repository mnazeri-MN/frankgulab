"use client"

import { useAuth } from "@payloadcms/ui"
import { PublishButton } from "@payloadcms/ui"

export function ConditionalPublishButton(props: Parameters<typeof PublishButton>[0]) {
  const { user } = useAuth()
  if ((user as { role?: string } | null)?.role !== "admin") return null
  return <PublishButton {...props} />
}
