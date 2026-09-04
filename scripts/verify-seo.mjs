#!/usr/bin/env node
/**
 * Static SEO verifier for the NEXAD export build.
 *
 * Analyzes the already-built static site in `out/` and fails (non-zero exit)
 * with readable messages on the first batch of problems it finds.
 *
 * Usage (run AFTER `npm run build`):
 *   # GitHub Pages preview
 *   NEXT_PUBLIC_SITE_ORIGIN=https://moobley.github.io \
 *   NEXT_PUBLIC_BASE_PATH=/NEXAD \
 *   NEXT_PUBLIC_SITE_INDEXABLE=false npm run verify:seo
 *
 *   # Production dry-run
 *   NEXT_PUBLIC_SITE_ORIGIN=https://www.nexadlab.com \
 *   NEXT_PUBLIC_BASE_PATH= \
 *   NEXT_PUBLIC_SITE_INDEXABLE=true npm run verify:seo
 *
 * CLI flags (override the NEXT_PUBLIC_* env vars):
 *   --origin <url>      expected public origin (scheme + host)
 *   --base-path <path>  expected deployment prefix ("" or "/NEXAD")
 *   --indexable <bool>  "true" | "false"
 *   --out <dir>         build output directory (default "out")
 */

import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const LOCALES = ["es", "en", "it"]

/** Locale-less routes with a human label, mirroring the localized site. */
const LOCALIZED_ROUTES = [
  ["", "Home"],
  ["services", "Services"],
  ["studio", "Studio"],
  ["work", "Work"],
  ["contact", "Contact"],
  ["work/corazon-napoletano", "Corazón Napoletano"],
  ["work/barber-booking", "Barber Booking"],
]

const PREVIEW_ORIGIN = "https://moobley.github.io"
const PRODUCTION_ORIGIN = "https://www.nexadlab.com"

// --- argument / env parsing -------------------------------------------------

function argValue(args, name) {
  const i = args.indexOf(name)
  return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined
}

function parseArgs(argv) {
  const out = argValue(argv, "--out") ?? "out"
  const origin =
    argValue(argv, "--origin") ??
    process.env.NEXT_PUBLIC_SITE_ORIGIN ??
    "http://localhost:3000"
  const basePath =
    argValue(argv, "--base-path") ?? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const indexableFlag = argValue(argv, "--indexable")
  const indexable =
    indexableFlag !== undefined
      ? indexableFlag === "true"
      : process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"

  return {
    outDir: out,
    origin: origin.replace(/\/+$/, ""),
    basePath,
    indexable,
  }
}

// --- tiny helpers -----------------------------------------------------------

function readText(file) {
  return fs.readFileSync(file, "utf8")
}

function fileFor(locale, route) {
  const parts = [locale, ...(route ? route.split("/") : []), "index.html"]
  return path.join(...parts)
}

function linkTags(html) {
  const out = []
  const re = /<link\b[^>]*>/g
  let m
  while ((m = re.exec(html))) {
    const tag = m[0]
    out.push({
      rel: /rel="([^"]*)"/.exec(tag)?.[1],
      href: /href="([^"]*)"/.exec(tag)?.[1],
      hreflang: /hrefLang="([^"]*)"/i.exec(tag)?.[1],
    })
  }
  return out
}

function canonicalOf(html) {
  return linkTags(html).find((l) => l.rel === "canonical")?.href ?? null
}

function robotsOf(html) {
  const re = /<meta\b[^>]*>/g
  let m
  while ((m = re.exec(html))) {
    const tag = m[0]
    if (/name="robots"/.test(tag)) {
      return /content="([^"]*)"/.exec(tag)?.[1] ?? null
    }
  }
  return null
}

function hreflangsOf(html) {
  const result = new Map()
  for (const l of linkTags(html)) {
    if (l.rel === "alternate" && l.hreflang && l.href) {
      result.set(l.hreflang, l.href)
    }
  }
  return result
}

function urlsIn(text) {
  return [...text.matchAll(/https?:\/\/[^\s"'<>)\]]+/g)].map((m) => m[0])
}

// --- main -------------------------------------------------------------------

const { outDir, origin, basePath, indexable } = parseArgs(process.argv.slice(2))

const sitePrefix = origin + (basePath ? `/${basePath.replace(/^\/+|\/+$/g, "")}` : "")
const forbiddenHost = origin === PRODUCTION_ORIGIN ? PREVIEW_ORIGIN : PRODUCTION_ORIGIN

const results = []
function record(name, ok, detail) {
  results.push({ name, ok, detail })
}

function failIf(condition, name, detail) {
  record(name, !condition, detail)
}

// 1 — localized main pages exist (gateway + every locale/route)
const htmlPages = []
for (const locale of LOCALES) {
  for (const [route, label] of LOCALIZED_ROUTES) {
    const file = path.join(outDir, fileFor(locale, route))
    const ok = fs.existsSync(file)
    record(`page exists: ${locale} ${label}`, ok, file)
    if (ok) htmlPages.push({ file, locale, label })
  }
}
const gatewayFile = path.join(outDir, "index.html")
const gatewayOk = fs.existsSync(gatewayFile)
record("page exists: gateway root", gatewayOk, gatewayFile)
if (gatewayOk) htmlPages.push({ file: gatewayFile, locale: null, label: "Gateway" })

// per-page checks
for (const { file, locale, label } of htmlPages) {
  const html = readText(file)
  const tag = locale ? `${locale} ${label}` : label

  const canonical = canonicalOf(html)
  failIf(!canonical, `canonical present: ${tag}`, "no canonical link found")
  if (canonical) {
    failIf(
      !canonical.startsWith(sitePrefix + "/") && canonical !== sitePrefix,
      `canonical origin: ${tag}`,
      canonical
    )
    if (locale) {
      failIf(
        !canonical.includes(`/${locale}/`),
        `canonical locale: ${tag}`,
        canonical
      )
    }
    if (basePath) {
      failIf(
        !canonical.includes(sitePrefix + "/"),
        `basePath kept: ${tag}`,
        canonical
      )
    } else {
      failIf(canonical.includes("/NEXAD"), `no /NEXAD: ${tag}`, canonical)
    }
    failIf(canonical.includes(forbiddenHost), `canonical origin not forbidden: ${tag}`, canonical)
  }

  const robots = robotsOf(html)
  failIf(!robots, `robots present: ${tag}`, "no robots meta found")
  if (robots) {
    if (indexable) {
      failIf(
        !(robots.includes("index") && !robots.includes("noindex")),
        `robots index: ${tag}`,
        robots
      )
    } else {
      failIf(!robots.includes("noindex"), `robots noindex: ${tag}`, robots)
    }
  }

  if (locale) {
    const hreflangs = hreflangsOf(html)
    const keys = [...hreflangs.keys()]
    for (const l of ["es", "en", "it", "x-default"]) {
      failIf(!keys.includes(l), `hreflang ${l}: ${tag}`, keys.join(",") || "none")
    }
  }

  failIf(html.includes(forbiddenHost), `no forbidden origin in markup: ${tag}`, forbiddenHost)
}

// robots.txt
const robotsFile = path.join(outDir, "robots.txt")
if (fs.existsSync(robotsFile)) {
  const robotsTxt = readText(robotsFile)
  const hasSitemap = robotsTxt.includes("Sitemap:")
  if (indexable) {
    failIf(!hasSitemap, "robots.txt advertises sitemap", "missing Sitemap: line")
  } else {
    failIf(hasSitemap, "robots.txt hides sitemap", "unexpected Sitemap: line")
  }
  failIf(!/User-Agent:/.test(robotsTxt), "robots.txt has User-Agent", robotsTxt.split("\n")[0])
} else {
  record("robots.txt exists", false, robotsFile)
}

// sitemap.xml
const sitemapFile = path.join(outDir, "sitemap.xml")
if (fs.existsSync(sitemapFile)) {
  const sitemap = readText(sitemapFile)
  const locs = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((m) => m[1])
  failIf(locs.length === 0, "sitemap has URLs", "no <loc> entries")
  for (const loc of locs) {
    failIf(
      !loc.startsWith(sitePrefix + "/") && loc !== sitePrefix,
      "sitemap origin",
      loc
    )
    failIf(loc.includes(forbiddenHost), "sitemap origin not forbidden", loc)
    if (!basePath) failIf(loc.includes("/NEXAD"), "sitemap no /NEXAD", loc)
  }
} else {
  record("sitemap.xml exists", false, sitemapFile)
}

// llms.txt
const llmsFile = path.join(outDir, "llms.txt")
if (fs.existsSync(llmsFile)) {
  const llms = readText(llmsFile)
  const urls = urlsIn(llms)

  failIf(urls.length === 0, "llms.txt has links", "no URLs found")
  const bpPrefix = basePath ? `/${basePath.replace(/^\/+|\/+$/g, "")}` : ""
  for (const url of urls) {
    failIf(!url.startsWith(origin), "llms.txt origin", url)
    let rest = url.slice(origin.length)
    if (bpPrefix && rest.startsWith(bpPrefix)) rest = rest.slice(bpPrefix.length)
    if (rest === "/sitemap.xml" || rest === "/sitemap.xml/") {
      failIf(!indexable, "llms.txt sitemap only when indexable", url)
      continue
    }
    failIf(!/^\/(es|en|it)\//.test(rest), "llms.txt locale-prefixed link", url)
  }

  if (indexable) {
    failIf(/Status: pre-launch/.test(llms), "llms.txt no pre-launch status", "Status line present in indexable build")
  } else {
    failIf(!/Status: pre-launch preview/.test(llms), "llms.txt pre-launch status", "missing Status line")
  }
} else {
  record("llms.txt exists", false, llmsFile)
}

// report
let failed = 0
for (const r of results) {
  if (!r.ok) failed++
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : ` — ${r.detail}`}`)
}

console.log(`\n${results.length - failed}/${results.length} checks passed.`)
if (failed > 0) {
  console.error(`\n${failed} check(s) FAILED.`)
  process.exit(1)
}
