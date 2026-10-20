import { NextResponse } from "next/server"
import { getPayload } from "payload"
import config from "@payload-config"

export const dynamic = "force-dynamic"

export async function GET() {
  const payload = await getPayload({ config })

  // Find the posts collection body field editor config
  const postsCollection = payload.config.collections.find(
    (c) => c.slug === "posts"
  )
  const bodyField = postsCollection?.fields?.find(
    (f) => "name" in f && f.name === "body"
  ) as { editor?: { resolvedFeatureMap?: Map<string, { key: string; ClientFeature?: string }> } } | undefined

  // Grab the resolved feature map from the editor
  const editor = bodyField?.editor as {
    resolvedFeatureMap?: Map<string, unknown>
    editorConfig?: { resolvedFeatureMap?: Map<string, unknown> }
  } | undefined

  const featureMap =
    editor?.resolvedFeatureMap ??
    editor?.editorConfig?.resolvedFeatureMap

  const features = featureMap
    ? Array.from(featureMap.entries()).map(([key, feature]) => {
        const f = feature as {
          key?: string
          ClientFeature?: string
          clientFeatureProps?: unknown
        }
        return {
          key,
          ClientFeature: f.ClientFeature ?? null,
        }
      })
    : null

  // Also expose what's in the import map
  const { importMap } = await import(
    "@/app/(payload)/admin/importMap.js"
  )
  const importMapKeys = Object.keys(importMap)

  return NextResponse.json({
    postsCollectionFound: !!postsCollection,
    bodyFieldFound: !!bodyField,
    bodyFieldType: bodyField ? ("type" in bodyField ? bodyField.type : "unknown") : null,
    editorKeys: editor ? Object.keys(editor) : null,
    featureCount: featureMap?.size ?? null,
    features,
    importMapKeys,
    fixedToolbarInImportMap: importMapKeys.includes(
      "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient"
    ),
    fixedToolbarFeatureInMap:
      featureMap?.has("toolbarFixed") ?? null,
  })
}
