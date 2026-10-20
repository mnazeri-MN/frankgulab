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

  // payload.importMap is the RUNTIME map used by initLexicalFeatures
  const payloadImportMapKeys = Object.keys(payload.importMap ?? {})

  // Also expose what's in our manual importMap.js
  const { importMap } = await import(
    "@/app/(payload)/admin/importMap.js"
  )
  const manualImportMapKeys = Object.keys(importMap)

  const fixedKey = "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient"
  const inlineKey = "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient"
  const boldKey = "@payloadcms/richtext-lexical/client#BoldFeatureClient"

  return NextResponse.json({
    postsCollectionFound: !!postsCollection,
    bodyFieldFound: !!bodyField,
    featureCount: featureMap?.size ?? null,
    features,
    // payload.importMap is what initLexicalFeatures uses
    payloadImportMapSize: payloadImportMapKeys.length,
    payloadImportMapHasFixed: payloadImportMapKeys.includes(fixedKey),
    payloadImportMapHasInline: payloadImportMapKeys.includes(inlineKey),
    payloadImportMapHasBold: payloadImportMapKeys.includes(boldKey),
    // sample of what's in payload.importMap
    payloadImportMapSample: payloadImportMapKeys.slice(0, 30),
    // our manual importMap.js
    manualImportMapSize: manualImportMapKeys.length,
    manualImportMapHasFixed: manualImportMapKeys.includes(fixedKey),
  })
}
