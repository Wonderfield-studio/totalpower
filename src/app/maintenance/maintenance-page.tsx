"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

const nav = [["Generators", "/generators"], ["Installation", "/installation"], ["Maintenance", "/maintenance"], ["Financing", "/financing"], ["Service Area", "/service-area"], ["About", "/about"], ["Builders", "/builders"]];
const sizes = ["Up to 28kW", "30–48kW", "60–80kW", "100–150kW"];
const prices = [
  [[350, 31], [450, 39], [525, 46], [650, 56]],
  [[625, 54], [850, 73], [950, 82], [1175, 101]],
  [[1050, 91], [1375, 119], [1600, 138], [2050, 177]],
];
const plans = [
  { name: "Total Essentials", label: "The annual check-up", response: "24", features: ["1 scheduled visit per year", "Oil, filter, air filter & spark plug service", "Full inspection & battery test", "10% off parts & labor"] },
  { name: "Total Care", label: "Year-round confidence", response: "12", features: ["2 scheduled visits per year", "Everything in Essentials", "Coolant service", "Transfer switch & controller check", "15% off parts & labor"] },
  { name: "Total Protect", label: "Complete peace of mind", response: "8", features: ["Everything in Total Care", "24/7 remote monitoring", "Dedicated pre-storm visit", "Free battery replacement", "Repairs covered up to $500", "20% off parts & labor"], featured: true },
];
const comparison = [
  ["Scheduled visits", "1 / year", "2 / year", "2 / year"],
  ["Guaranteed response time", "24 hours", "12 hours", "8 hours"],
  ["Response priority", "Standard", "Priority", "Top priority"],
  ["Full annual service", "✓", "✓", "✓"],
  ["Coolant service", "—", "✓", "✓"],
  ["Transfer switch & controller check", "—", "✓", "✓"],
  ["Free battery replacement", "—", "—", "✓"],
  ["24/7 remote monitoring", "Add-on", "Add-on", "Included"],
  ["Dedicated pre-storm visit", "Add-on", "Add-on", "Included"],
  ["Repairs covered up to $500", "—", "—", "✓"],
  ["Parts & labor discount", "10%", "15%", "20%"],
];

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
function Check() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7.5" /></svg>; }

export default function MaintenancePage({ fontClassName }: { fontClassName: string }) {
  const [size, setSize] = useState(0);
  const [annual, setAnnual] = useState(true);
  const price = (plan: number) => `$${prices[plan][size][annual ? 0 : 1].toLocaleString()}`;
  const alt = (plan: number) => annual ? `or $${prices[plan][size][1]}/mo billed monthly` : `or $${prices[plan][size][0].toLocaleString()}/yr paid annually`;

  return <main className={`${styles.page} ${fontClassName}`}>
    <div className={styles.navWrap}><header className={styles.header}>
      <Link href="/" className={styles.logo}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" priority /></Link>
      <nav>{nav.map(([label, href]) => <Link className={href === "/maintenance" ? styles.active : ""} key={href} href={href}>{label}</Link>)}</nav>
      <Link href="/quote" className={styles.primary}>Get a Free Quote <Arrow /></Link>
    </header></div>

    <section className={styles.hero}>
      <Image src="/generator-detail.png" fill priority sizes="100vw" alt="Standby generator detail" />
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}><p className={styles.kicker}>Maintenance plans</p><h1>A generator is only as good as its last checkup.</h1><p className={styles.lede}>Three plan tiers built around how hands-on you want to be, from an annual check-up to full peace of mind through hurricane season.</p><div className={styles.actions}><a className={styles.primary} href="#plans">Choose Your Plan <Arrow /></a><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div>
      <div className={styles.response}><p className={styles.kicker}>Guaranteed response, in writing</p>{plans.map(p => <a href="#plans" key={p.name}><strong>{p.name}</strong><span><b>{p.response}</b> hrs</span></a>)}</div>
    </section>

    <section className={styles.pricing} id="plans"><div className={styles.container}>
      <div className={styles.sectionHead}><div><p className={styles.kicker}>Plans & pricing</p><h2>Pick your size.<br />Pick your plan.</h2><p>Straightforward, published pricing. No waiting on a quote to know what you’ll pay.</p></div><div><span className={styles.controlLabel}>Billing</span><div className={styles.segmented}><button aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <small>· save ~8%</small></button><button aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button></div></div></div>
      <div className={styles.sizes}><div><span className={styles.controlLabel}>Generator size</span><p>Prices update for your unit.</p></div><div>{sizes.map((label, i) => <button aria-pressed={size === i} onClick={() => setSize(i)} key={label}><b>{label}</b><small>from ${prices[0][i][annual ? 0 : 1].toLocaleString()}/{annual ? "yr" : "mo"}</small></button>)}</div></div>
      <div className={styles.planGrid}>{plans.map((p, i) => <article className={p.featured ? styles.featured : ""} key={p.name}>{p.featured && <em>Most complete</em>}<p className={styles.cardLabel}>{p.label}</p><h3>{p.name}</h3><div className={styles.price}>{price(i)} <span>/{annual ? "yr" : "mo"}</span></div><p className={styles.alt}>{alt(i)} · {sizes[size]}</p><hr /><ul>{p.features.map(f => <li key={f}><Check /> <span>{f}</span></li>)}</ul><Link href="/quote">Choose {p.name.replace("Total ", "")} <Arrow /></Link></article>)}</div>
    </div></section>

    <section className={styles.compare}><div className={styles.container}><div className={styles.sectionHead}><div><p className={styles.kicker}>Compare plans</p><h2>Every detail,<br />side by side.</h2></div><p>Showing prices for <b>{sizes[size]}</b> · billed {annual ? "annually" : "monthly"}</p></div><div className={styles.tableWrap}><table><thead><tr><th>Plan features</th>{plans.map((p,i)=><th key={p.name}>{p.name}<small>{price(i)}/{annual ? "yr" : "mo"}</small></th>)}</tr></thead><tbody>{comparison.map(row=><tr key={row[0]}>{row.map((cell,i)=><th scope={i === 0 ? "row" : undefined} key={i}>{cell}</th>)}</tr>)}</tbody></table></div></div></section>

    <section className={styles.monitor}><div className={styles.container}><div><p className={styles.kicker}>24/7 remote monitoring</p><h2>You get the alert.<br />We’re already on it.</h2><p className={styles.lede}>We track your generator’s health around the clock and often catch a problem before you’d ever notice it yourself.</p></div><div className={styles.monitorCards}><article><span>Essentials & Care</span><strong>+$18<small>/mo</small></strong><p>Flat add-on price on any generator size.</p></article><article><span>Total Protect</span><strong>Included</strong><p>At no extra cost, along with a dedicated pre-storm visit.</p></article><p><b>Alert lands on your phone.</b> On a monitoring plan, it lands with our team too, and we reach out to schedule the fix.</p></div></div></section>

    <section className={styles.benefits}><div className={styles.container}><p className={styles.kicker}>Built for hurricane season</p><h2>Why South Florida homeowners choose us.</h2><div>{[["A real visit before the storm","Total Protect includes a dedicated, in-person visit ahead of any named storm heading toward South Florida."],["Response times in writing","Guaranteed in writing, not just promised over the phone."],["Genuine parts, licensed techs","OEM-spec parts and Florida-licensed technicians on every visit."],["Published pricing","Straightforward pricing, so there’s no waiting on a quote to know what you’ll pay."]].map(([h,p],i)=><article className={i===0?styles.orangeCard:""} key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></article>)}</div></div></section>

    <footer className={styles.footer}><div className={styles.footerMain}><div><h2>Ready every time.<br /><span>Not most of the time.</span></h2><p>We’re happy to answer questions or help you figure out which plan is the right fit for your home.</p></div><div className={styles.actions}><a className={styles.primary} href="#plans">Choose Your Plan <Arrow /></a><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div><p className={styles.disclaimer}>Total Protect enrollment includes a brief eligibility inspection to confirm your generator qualifies for the full covered-repair benefit. Pricing and plan features are current as of the date of publication and are subject to change; ask your representative for the latest details.</p><div className={styles.legal}><span>Total Power & Gas Contractors · hello@totalpowergenerators.com · 4794 SW 75th Ave, Miami, FL 33155</span><span>© 2026 Total Power & Gas Contractors</span></div></footer>
  </main>;
}
