#!/usr/bin/env node

/**
 * Sitemap Generator for muneersahel.com
 *
 * This script generates a sitemap.xml file for the website by:
 * 1. Reading static routes from the app
 * 2. Fetching blog posts from Firebase Firestore
 * 3. Generating XML sitemap with proper lastmod, changefreq, and priority
 *
 * The sitemap is automatically generated after each build via npm run build
 * Output: dist/profile/browser/sitemap.xml
 *
 * Usage:
 *   npm run generate:sitemap  (standalone)
 *   npm run build             (includes sitemap generation)
 */

import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Configuration
const SITE_URL = "https://muneersahel.com";
const OUTPUT_PATH = join(rootDir, "src/sitemap.xml");

// Firebase configuration
const firebaseConfig = {
  projectId: "muneersahel",
  appId: "1:1049500314015:web:b0f618cd743a58a9b3b5aa",
  storageBucket: "muneersahel.appspot.com",
  apiKey: "AIzaSyAsjcjQCJvJuJcZPt_5r0M5OLX5ZGP8te8",
  authDomain: "muneersahel.firebaseapp.com",
  messagingSenderId: "1049500314015",
  measurementId: "G-G2BMEHD10R",
};

// Static routes (public routes only, exclude admin routes)
const staticRoutes = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "services", priority: "0.8", changefreq: "monthly" },
  { path: "resume", priority: "0.8", changefreq: "monthly" },
  { path: "works", priority: "0.8", changefreq: "monthly" },
  { path: "contact", priority: "0.7", changefreq: "monthly" },
  { path: "blogs", priority: "0.9", changefreq: "weekly" },
];

// Fetch blog posts from Firestore
async function getBlogPosts() {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Query blogs collection
    const blogsCol = collection(db, "blogs");
    const blogsQuery = query(blogsCol, orderBy("num", "asc"));
    const querySnapshot = await getDocs(blogsQuery);

    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push(doc.data());
    });

    console.log(`📚 Fetched ${blogs.length} blog posts from Firestore`);
    return blogs;
  } catch (error) {
    console.warn("⚠️  Could not fetch blogs from Firestore:", error.message);
    return [];
  }
}

// Generate sitemap XML
function generateSitemap(blogs) {
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
async function main() {
  try {
    console.log("🚀 Starting sitemap generation...");

    const blogs = await getBlogPosts();
    const sitemap = generateSitemap(blogs);

    writeFileSync(OUTPUT_PATH, sitemap, "utf-8");

    console.log("✅ Sitemap generated successfully at:", OUTPUT_PATH);
    console.log(`📊 Total URLs: ${staticRoutes.length + blogs.length}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

main();
