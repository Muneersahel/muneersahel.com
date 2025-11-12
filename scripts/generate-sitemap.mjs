#!/usr/bin/env node

/**
 * Sitemap Generator for muneersahel.com
 *
 * This script generates a sitemap.xml file for the website by:
 * 1. Reading static routes from the app
 * 2. Reading blog posts from public/content/content.json
 * 3. Generating XML sitemap with proper lastmod, changefreq, and priority
 *
 * The sitemap is automatically generated after each build via npm run build
 * Output: dist/profile/browser/sitemap.xml
 *
 * Usage:
 *   npm run generate:sitemap  (standalone)
 *   npm run build             (includes sitemap generation)
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Configuration
const SITE_URL = "https://muneersahel.com";
const OUTPUT_PATH = join(rootDir, "dist/profile/browser/sitemap.xml");

// Static routes (public routes only, exclude admin routes)
const staticRoutes = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "services", priority: "0.8", changefreq: "monthly" },
  { path: "resume", priority: "0.8", changefreq: "monthly" },
  { path: "works", priority: "0.8", changefreq: "monthly" },
  { path: "contact", priority: "0.7", changefreq: "monthly" },
  { path: "blogs", priority: "0.9", changefreq: "weekly" },
];

// Read blog posts from content.json
function getBlogPosts() {
  try {
    const contentPath = join(rootDir, "public/content/content.json");
    const content = JSON.parse(readFileSync(contentPath, "utf-8"));
    return content.blogs || [];
  } catch (error) {
    console.warn("Could not read content.json:", error.message);
    return [];
  }
}

// Generate sitemap XML
function generateSitemap() {
  const blogs = getBlogPosts();
  const currentDate = new Date().toISOString().split("T")[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach((route) => {
    xml += "  <url>\n";
    xml += `    <loc>${SITE_URL}/${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  // Add blog post routes
  blogs.forEach((blog) => {
    xml += "  <url>\n";
    xml += `    <loc>${SITE_URL}/blogs/${blog.slug}</loc>\n`;
    xml += `    <lastmod>${blog.date || currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>\n";

  return xml;
}

// Main execution
try {
  const sitemap = generateSitemap();
  writeFileSync(OUTPUT_PATH, sitemap, "utf-8");
  console.log("✅ Sitemap generated successfully at:", OUTPUT_PATH);
  console.log(`📊 Total URLs: ${staticRoutes.length + getBlogPosts().length}`);
} catch (error) {
  console.error("❌ Error generating sitemap:", error);
  process.exit(1);
}
