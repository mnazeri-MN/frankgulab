if (!globalThis.File) {
  const { File } = await import("node:buffer")
  globalThis.File = File
}
