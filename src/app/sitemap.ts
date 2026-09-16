import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/pricing", "/about", "/contact", "/backtesting", "/live"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/live" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
