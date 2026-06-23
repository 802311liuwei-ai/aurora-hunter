import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const distDir = "dist";
const source = join(distDir, "index.html");

const routes = [
  "/tours",
  "/experiences",
  "/food",
  "/custom",
  "/booking",
  "/orders",
  "/guides",
  "/about",
  "/admin",
  "/tour/full-immersion",
  "/tour/aurora-classic",
  "/tour/summer-teriberka",
  "/tour/rybachy",
  "/tour/seidozero",
  "/guide/winter-checklist",
  "/guide/aurora-season",
  "/guide/aurora-probability",
  "/guide/choose-aurora-tour",
  "/guide/aurora-forecast",
  "/guide/aurora-photo",
  "/guide/teriberka",
  "/guide/family-safety",
  "/guide/service-process",
  "/guide-topic/aurora-basics",
  "/guide-topic/murmansk-city",
  "/guide-topic/aurora-tour",
  "/guide-topic/teriberka-guide",
  "/guide-topic/winter-gear",
  "/guide-topic/aurora-photo-category",
  "/guide-topic/family-travel-category",
  "/guide-topic/russia-prep",
  "/guide-topic/arctic-experiences",
];

if (!existsSync(source)) {
  throw new Error("dist/index.html not found. Run vite build first.");
}

for (const route of routes) {
  const target = join(distDir, route.replace(/^\/+/, ""), "index.html");
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

copyFileSync(source, join(distDir, "404.html"));
