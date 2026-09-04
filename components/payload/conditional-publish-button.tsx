"use client"

import { PublishButton, useAuth } from "@payloadcms/ui"

export function ConditionalPublishButton() {
  const { user } = useAuth()
  if ((user as { role?: string } | null)?.role !== "admin") return null
  return <PublishButton />
}
