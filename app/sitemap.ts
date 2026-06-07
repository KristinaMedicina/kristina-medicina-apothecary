import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { articles } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/consultations",
    "/journal",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/shipping-returns",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
