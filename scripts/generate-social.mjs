import sharp from "sharp"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(here, "..", "public", "social", "nexad-social.svg")
const out = path.join(here, "..", "public", "social", "nexad-social.png")

try {
  const info = await sharp(src, { density: 96 })
    .resize(1200, 630)
    .png()
    .toFile(out)
  console.log("OK", info.width, info.height, info.size)
} catch (err) {
  console.error(err.message)
  process.exit(1)
}