import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Total Power Generators",
    short_name: "Total Power",
    description: "Whole-home standby power, professionally installed and maintained in South Florida.",
    start_url: "/",
    display: "standalone",
    background_color: "#04111e",
    theme_color: "#04111e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
