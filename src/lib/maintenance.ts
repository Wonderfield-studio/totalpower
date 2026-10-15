// Prices, size ranges, features and response times are retained from the existing builder.
// Only Protect’s after-hours waiver is confirmed; other tiers require policy confirmation.
export const sizes = ["Up to 28kW", "30–48kW", "60–80kW", "100–150kW"];
export const prices = [
  [[350, 31], [450, 39], [525, 46], [650, 56]],
  [[625, 54], [850, 73], [950, 82], [1175, 101]],
  [[1050, 91], [1375, 119], [1600, 138], [2050, 177]],
];
export const plans = [
  { id: "essentials", priority: "Standard", afterHours: "Please confirm", name: "Total Essentials", label: "The annual check-up", response: "24", features: ["1 scheduled visit per year", "Oil, filter, air filter & spark plug service", "Full inspection & battery test", "10% off parts & labor"] },
  { id: "care", priority: "Priority", afterHours: "Please confirm", name: "Total Care", label: "Year-round confidence", response: "12", features: ["2 scheduled visits per year", "Everything in Essentials", "Coolant service", "Transfer switch & controller check", "15% off parts & labor"] },
  { id: "protect", priority: "Highest priority", afterHours: "Waived", name: "Total Protect", label: "Complete peace of mind", response: "8", features: ["Everything in Total Care", "24/7 remote monitoring", "Dedicated pre-storm visit", "Free battery replacement*", "Repairs covered up to $500*", "20% off parts & labor"], featured: true },
];
export const comparison = [
  ["Scheduled visits", "1 / year", "2 / year", "2 / year"],
  ["Guaranteed response time", ...plans.map(plan => `${plan.response} hours`)],
  ["Service priority", ...plans.map(plan => plan.priority)],
  ["After-hours emergency service charge", ...plans.map(plan => plan.afterHours)],
  ["Full annual service", "✓", "✓", "✓"],
  ["Coolant service", "—", "✓", "✓"],
  ["Transfer switch & controller check", "—", "✓", "✓"],
  ["Free battery replacement*", "—", "—", "✓"],
  ["24/7 remote monitoring", "Add-on", "Add-on", "Included"],
  ["Dedicated pre-storm visit", "Add-on", "Add-on", "Included"],
  ["Repairs covered up to $500*", "—", "—", "✓"],
  ["Parts & labor discount", "10%", "15%", "20%"],
];

export const quotePlanOptions = plans.flatMap(plan => sizes.flatMap(size => ["Annual", "Monthly"].map(cycle => `${plan.name} · ${size} · ${cycle}`)));

export function readConfiguration(params: { get: (key: string) => string | null }) {
  const selected = plans.find(plan => plan.id === params.get("plan"))?.id ?? null;
  const size = sizes.indexOf(params.get("size") ?? "");
  return { selected, size: size < 0 ? 0 : size, annual: params.get("billing") !== "monthly" };
}
