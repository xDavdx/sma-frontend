const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const hostname = "https://sma-frontend-0meh.onrender.com/";
const routes = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/koncerti", changefreq: "weekly", priority: 0.9 },
    { url: "/novice", changefreq: "weekly", priority: 0.6 },
    { url: "/o-nas", changefreq: "monthly", priority: 0.9 },
    { url: "/drustvo-odeon", changefreq: "monthly", priority: 0.6 },
];

const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
const stream = new SitemapStream({ hostname });

routes.forEach((route) => stream.write(route));
stream.end();

streamToPromise(stream).then((data) => {
    createWriteStream(sitemapPath).end(data);
});
