const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const content = JSON.parse(
  readFileSync(join(__dirname, "../../public/content/content.json"), "utf-8"),
);

const blogs = content.blogs;

const blogRoutes = blogs.map((blog) => `/blogs/${blog.slug}`);

writeFileSync(
  join(__dirname, "../prerender-routes.txt"),
  blogRoutes.join("\n"),
);
