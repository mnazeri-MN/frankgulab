export async function register() {
  if (!("File" in globalThis)) {
    const { File } = await import("node:buffer")
    // @ts-expect-error polyfill for Node < 20
    globalThis.File = File
  }
}
