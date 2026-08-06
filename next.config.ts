import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"
import fs from "fs"
import path from "path"

// Load .env.local before withPayload evaluates payload.config.ts
const envPath = path.resolve(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const eq = line.indexOf("=")
    if (eq > 0 && !line.startsWith("#")) {
      const key = line.slice(0, eq).trim()
      const val = line.slice(eq + 1).trim()
      if (key && !(key in process.env)) process.env[key] = val
    }
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
}

export default withPayload(nextConfig)
