"use client"

import { PublishButton, useAuth } from "@payloadcms/ui"

export function ConditionalPublishButton() {
  const { user } = useAuth()
  // Only explicitly hide for editors — unknown/undefined role defaults to showing the button
  if ((user as { role?: string } | null)?.role === "editor") return null
  return <PublishButton />
}
