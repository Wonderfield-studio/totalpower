import type { MetadataRoute } from "next";

const origin = "https://totalpowergenerators.com";
const mainRoutes = ["", "/generators", "/installation", "/maintenance", "/financing", "/service-area", "/about", "/builders", "/reviews", "/faq", "/service-repair", "/quote", "/terms"];
const cityRoutes = ["/service-area/miami", "/service-area/fort-lauderdale", "/service-area/boca-raton", "/service-area/boynton-beach"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...mainRoutes.map((route, index) => ({
      url: `${origin}${route}`,
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : route === "/quote" ? .9 : .8,
    })),
    ...cityRoutes.map((route) => ({ url: `${origin}${route}`, changeFrequency: "monthly" as const, priority: .75 })),
  ];
}
