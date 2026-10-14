import { NextResponse } from "next/server";

const coveredZips = new Set([
  "33004","33009","33010","33012","33013","33014","33015","33016","33018","33019","33020","33021","33023","33024","33025","33026","33027","33028","33029","33030","33031","33032","33033","33034","33035","33039","33054","33055","33056","33060","33061","33062","33063","33064","33065","33066","33067","33068","33069","33071","33073","33074","33075","33076","33077",
  "33101","33109","33122","33125","33126","33127","33128","33129","33130","33131","33132","33133","33134","33135","33136","33137","33138","33139","33140","33141","33142","33143","33144","33145","33146","33147","33149","33150","33154","33155","33156","33157","33158","33160","33161","33162","33165","33166","33167","33168","33169","33170","33172","33173","33174","33175","33176","33177","33178","33179","33180","33181","33182","33183","33184","33185","33186","33187","33189","33190","33193","33194","33196",
  "33301","33304","33305","33306","33308","33309","33311","33312","33313","33314","33315","33316","33317","33319","33321","33322","33323","33324","33325","33326","33327","33328","33330","33331","33332","33334","33351",
  "33424","33425","33426","33427","33428","33429","33431","33432","33433","33434","33435","33436","33437","33444","33445","33446","33448","33472","33473","33474","33481","33482","33483","33484","33486","33487","33488","33496","33497","33498",
]);
const coveredCities = ["miami", "hialeah", "homestead", "doral", "aventura", "coral gables", "miami beach", "fort lauderdale", "hollywood", "pembroke", "plantation", "coral springs", "pompano", "deerfield beach", "boca raton", "delray beach", "boynton beach"];

export async function POST(request: Request) {
  const { address = "" } = await request.json() as { address?: string };
  const normalized = address.trim().toLowerCase();
  if (!normalized) return NextResponse.json({ error: "Enter an address or ZIP code." }, { status: 400 });
  const zip = normalized.match(/\b\d{5}\b/)?.[0];
  if (zip) return NextResponse.json({ covered: coveredZips.has(zip) });

  try {
    const censusUrl = new URL("https://geocoding.geo.census.gov/geocoder/locations/onelineaddress");
    censusUrl.search = new URLSearchParams({ address, benchmark: "Public_AR_Current", format: "json" }).toString();
    const census = await fetch(censusUrl, { signal: AbortSignal.timeout(7000) }).then(response => response.json());
    const match = census?.result?.addressMatches?.[0];
    if (!match) return NextResponse.json({ covered: coveredCities.some(city => normalized.includes(city)), uncertain: true });
    const { x: longitude, y: latitude } = match.coordinates;
    const areaUrl = `https://geo.fcc.gov/api/census/area?lat=${latitude}&lon=${longitude}&format=json`;
    const fcc = await fetch(areaUrl, { signal: AbortSignal.timeout(7000) }).then(response => response.json());
    const county = String(fcc?.results?.[0]?.county_name ?? "").toLowerCase();
    const covered = county.includes("miami-dade") || county.includes("broward") || (county.includes("palm beach") && Number(latitude) <= 26.57);
    return NextResponse.json({ covered });
  } catch {
    return NextResponse.json({ covered: coveredCities.some(city => normalized.includes(city)), uncertain: true });
  }
}
