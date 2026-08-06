// Polyfill File for Node.js < 20 (needed by undici / Payload deps)
if (!globalThis.File) {
  const { File } = require("node:buffer")
  globalThis.File = File
}
