import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const distDir = "dist";
const source = join(distDir, "index.html");
const siteUrl = "https://aurorahunterarctic.com";

const routes = [
  "/tours",
  "/experiences",
  "/food",
  "/custom",
  "/guides",
  "/about",
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
  "/guide/aurora-calendar",
  "/guide/teriberka-whale-calendar",
  "/guide/china-traveler-faq-20",
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

const routeMeta = {
  "/": ["摩尔曼斯克极光旅游攻略 | Aurora Hunter极光猎人", "Aurora Hunter极光猎人面向中国游客提供摩尔曼斯克极光旅游、俄罗斯极光、北极光旅游、追极光行程信息与群内中文服务。"],
  "/tours": ["摩尔曼斯克极光旅游完整行程 | Aurora Hunter极光猎人", "查看摩尔曼斯克4天3晚极光行程、捷里别尔卡北冰洋、萨米民族村、希比内山脉与夏季寻鲸线路。"],
  "/experiences": ["摩尔曼斯克北境风景与北极美食 | Aurora Hunter极光猎人", "了解摩尔曼斯克极光、萨米民族村、捷里别尔卡、列宁号破冰船、阿廖沙纪念碑、北极美食与餐厅推荐。"],
  "/food": ["摩尔曼斯克美食指南_帝王蟹与北极餐厅推荐 | Aurora Hunter极光猎人", "第一次来摩尔曼斯克北极圈必吃帝王蟹、北极扇贝、海胆、鳕鱼、驯鹿肉、北极浆果与当地餐厅定位。"],
  "/custom": ["获取摩尔曼斯克极光行程方案 | Aurora Hunter极光猎人", "提交摩尔曼斯克极光旅游咨询需求，了解俄罗斯极光、北极光旅游、追光团和当地旅行社接待安排。"],
  "/guides": ["摩尔曼斯克极光攻略_俄罗斯极光旅游指南 | Aurora Hunter极光猎人", "摩尔曼斯克极光最佳时间、极光概率、追光团、当地团、包车、接机、装备、摄影、亲子和俄罗斯签证攻略。"],
  "/about": ["关于Aurora Hunter极光猎人_摩尔曼斯克极光中文服务", "Aurora Hunter极光猎人提供摩尔曼斯克极光旅游信息咨询与群内中文服务，接待由合作俄罗斯持牌旅行社执行。"],
};

for (const journey of [
  ["full-immersion", "北方极光沉浸式体验之旅"],
  ["aurora-classic", "追光之旅北境经典线"],
  ["summer-teriberka", "夏季捷里别尔卡寻鲸之旅"],
  ["rybachy", "雷巴奇半岛越野之旅"],
  ["seidozero", "谢伊多泽罗湖与北冰洋组合"],
]) {
  routeMeta[`/tour/${journey[0]}`] = [`${journey[1]}_摩尔曼斯克旅游线路 | Aurora Hunter极光猎人`, `了解${journey[1]}的季节、重点体验、逐日安排、当地旅行社接待说明与中文沟通服务。`];
}

for (const guide of [
  ["winter-checklist", "摩尔曼斯克冬季追光旅行完整清单"],
  ["aurora-season", "什么时间最容易看到摩尔曼斯克极光"],
  ["aurora-probability", "摩尔曼斯克极光概率怎么看"],
  ["choose-aurora-tour", "如何选择摩尔曼斯克追光团"],
  ["aurora-forecast", "极光预测怎么看"],
  ["aurora-photo", "极光摄影指南"],
  ["teriberka", "捷里别尔卡怎么安排"],
  ["family-safety", "多大的孩子适合去追极光"],
  ["service-process", "Aurora Hunter服务流程说明"],
  ["aurora-calendar", "摩尔曼斯克极光季节日历"],
  ["teriberka-whale-calendar", "捷里别尔卡观鲸月份记录"],
  ["china-traveler-faq-20", "中国游客去摩尔曼斯克最常见的20个问题"],
]) {
  routeMeta[`/guide/${guide[0]}`] = [`${guide[1]} | Aurora Hunter极光猎人`, `阅读${guide[1]}，了解俄罗斯摩尔曼斯克极光旅游、北极圈旅行准备、当地接待和中文服务说明。`];
}

for (const topic of [
  ["aurora-basics", "极光观测指南"],
  ["murmansk-city", "摩尔曼斯克旅行基础"],
  ["aurora-tour", "追光团与当地团怎么选择"],
  ["teriberka-guide", "捷里别尔卡与北冰洋攻略"],
  ["winter-gear", "冬季装备与穿衣指南"],
  ["aurora-photo-category", "手机与相机极光摄影"],
  ["family-travel-category", "亲子追光旅行建议"],
  ["russia-prep", "俄罗斯出行准备"],
  ["arctic-experiences", "北极特色体验选择"],
]) {
  routeMeta[`/guide-topic/${topic[0]}`] = [`${topic[1]}_摩尔曼斯克极光攻略 | Aurora Hunter极光猎人`, `按主题阅读${topic[1]}，覆盖摩尔曼斯克极光旅游、俄罗斯北极圈旅行、签证现金、装备和亲子出行。`];
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function absoluteUrl(route) {
  return `${siteUrl}${route === "/" ? "/" : `${route}/`}`;
}

function seoHead(route) {
  const [title, description] = routeMeta[route] || routeMeta["/"];
  const url = absoluteUrl(route);
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ].join("\n    ");
}

function withRouteSeo(html, route) {
  return html
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta name="description" content=".*?" \/>/s, "")
    .replace(/<link rel="canonical" href=".*?" \/>/s, "")
    .replace(/<meta property="og:title" content=".*?" \/>/s, "")
    .replace(/<meta property="og:description" content=".*?" \/>/s, "")
    .replace(/<meta property="og:url" content=".*?" \/>/s, "")
    .replace(/<meta name="twitter:title" content=".*?" \/>/s, "")
    .replace(/<meta name="twitter:description" content=".*?" \/>/s, "")
    .replace("</head>", `    ${seoHead(route)}\n  </head>`);
}

if (!existsSync(source)) {
  throw new Error("dist/index.html not found. Run vite build first.");
}

const html = readFileSync(source, "utf8");
writeFileSync(source, withRouteSeo(html, "/"));

for (const route of routes) {
  const target = join(distDir, route.replace(/^\/+/, ""), "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, withRouteSeo(html, route));
}

copyFileSync(source, join(distDir, "404.html"));

const sitemapRoutes = ["/", ...routes];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(distDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map((route) => `  <url><loc>${absoluteUrl(route)}</loc><lastmod>${today}</lastmod><changefreq>${route.startsWith("/guide") ? "weekly" : "monthly"}</changefreq><priority>${route === "/" ? "1.0" : route === "/custom" ? "0.9" : "0.7"}</priority></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(distDir, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /orders\nDisallow: /booking\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync(join(distDir, "baidu-urls.txt"), `${sitemapRoutes.map(absoluteUrl).join("\n")}\n`);
