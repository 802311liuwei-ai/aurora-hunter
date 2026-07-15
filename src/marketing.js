const env = import.meta.env;

const scriptIds = new Set();

function getEnv(name) {
  return String(env[name] || "").trim();
}

function loadScript(id, src) {
  if (!src || scriptIds.has(id) || document.getElementById(id)) return;
  scriptIds.add(id);
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initBaiduAnalytics() {
  const baiduId = getEnv("VITE_BAIDU_ANALYTICS_ID");
  if (!baiduId) return;
  window._hmt = window._hmt || [];
  loadScript("baidu-tongji", `https://hm.baidu.com/hm.js?${encodeURIComponent(baiduId)}`);
}

function initGoogleTags() {
  const googleAnalyticsId = getEnv("VITE_GA_MEASUREMENT_ID");
  const googleAdsId = getEnv("VITE_GOOGLE_ADS_ID");
  const googleTagId = googleAnalyticsId || googleAdsId;
  if (!googleTagId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  if (googleAnalyticsId) window.gtag("config", googleAnalyticsId);
  if (googleAdsId) window.gtag("config", googleAdsId);
  loadScript("google-gtag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`);
}

function initBingUet() {
  const bingTagId = getEnv("VITE_BING_UET_TAG_ID");
  if (!bingTagId || window.__auroraBingUetLoaded) return;
  window.__auroraBingUetLoaded = true;
  window.uetq = window.uetq || [];
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://bat.bing.com/bat.js";
  script.onload = () => {
    if (window.UET) {
      window.uetq = new window.UET({ ti: bingTagId, enableAutoSpaTracking: true });
      window.uetq.push("pageLoad");
    }
  };
  document.head.appendChild(script);
}

function initMetaPixel() {
  const metaPixelId = getEnv("VITE_META_PIXEL_ID");
  if (!metaPixelId || window.fbq) return;
  window.fbq = function fbq() {
    window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
  };
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window._fbq = window.fbq;
  loadScript("meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", metaPixelId);
  window.fbq("track", "PageView");
}

export function initMarketing() {
  if (typeof window === "undefined") return;
  initBaiduAnalytics();
  initGoogleTags();
  initBingUet();
  initMetaPixel();
}

export function trackPageView(path) {
  if (typeof window === "undefined") return;
  const pagePath = path || window.location.pathname;
  window._hmt?.push(["_trackPageview", pagePath]);
  window.gtag?.("event", "page_view", { page_path: pagePath });
  window.uetq?.push?.("event", "page_view", { page_path: pagePath });
  window.fbq?.("trackCustom", "PageViewSPA", { page_path: pagePath });
}

export function trackMarketingEvent(eventName, detail = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    event_category: detail.category || "engagement",
    event_label: detail.label || eventName,
    value: detail.value || 1,
    ...detail,
  };

  window._hmt?.push(["_trackEvent", payload.event_category, eventName, payload.event_label, payload.value]);
  window.dataLayer?.push({ event: eventName, ...payload });
  window.gtag?.("event", eventName, payload);
  window.uetq?.push?.("event", eventName, payload);

  if (eventName === "generate_lead") {
    const googleAdsId = getEnv("VITE_GOOGLE_ADS_ID");
    const conversionLabel = getEnv("VITE_GOOGLE_ADS_LEAD_LABEL");
    if (googleAdsId && conversionLabel) {
      window.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${conversionLabel}`, value: payload.value });
    }
    window.fbq?.("track", "Lead", payload);
  } else {
    window.fbq?.("trackCustom", eventName, payload);
  }
}
