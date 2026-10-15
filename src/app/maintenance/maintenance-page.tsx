"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BadgeDollarSign, BellRing, ChevronLeft, ChevronRight, CirclePlus, CloudLightning, Clock3, Wrench } from "lucide-react";
import styles from "./page.module.css";
import InteriorEffects from "../[slug]/interior-effects";
import MobileNav from "../../components/MobileNav";

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
  { name: "Total Protect", label: "Complete peace of mind", response: "8", features: ["Everything in Total Care", "24/7 remote monitoring", "Dedicated pre-storm visit", "Free battery replacement*", "Repairs covered up to $500*", "20% off parts & labor"], featured: true },
];
const comparison = [
  ["Scheduled visits", "1 / year", "2 / year", "2 / year"],
  ["Guaranteed response time", "24 hours", "12 hours", "8 hours"],
  ["Response priority", "Standard", "Priority", "Top priority"],
  ["Full annual service", "✓", "✓", "✓"],
  ["Coolant service", "—", "✓", "✓"],
  ["Transfer switch & controller check", "—", "✓", "✓"],
  ["Free battery replacement*", "—", "—", "✓"],
  ["24/7 remote monitoring", "Add-on", "Add-on", "Included"],
  ["Dedicated pre-storm visit", "Add-on", "Add-on", "Included"],
  ["Repairs covered up to $500*", "—", "—", "✓"],
  ["Parts & labor discount", "10%", "15%", "20%"],
];
const benefits = [
  { title: "A real visit before the storm", copy: "An in-person check before a named storm reaches South Florida.", detail: "Total Protect members receive a dedicated pre-storm visit so the system is tested before conditions deteriorate.", Icon: CloudLightning },
  { title: "Response times in writing", copy: "A written guarantee, not a promise over the phone.", detail: "Your plan sets a clear 24, 12 or 8-hour response window, with higher tiers receiving priority dispatch.", Icon: Clock3 },
  { title: "Genuine parts, licensed techs", copy: "OEM-spec parts and Florida-licensed technicians.", detail: "Every visit is completed with manufacturer-spec components by technicians qualified for South Florida homes.", Icon: Wrench },
  { title: "Published pricing", copy: "Clear pricing before you commit.", detail: "Plan costs and included services are shown upfront, with no quote required just to understand the price.", Icon: BadgeDollarSign },
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);
function Check() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7.5" /></svg>; }

export default function MaintenancePage({ fontClassName }: { fontClassName: string }) {
  const [size, setSize] = useState(0);
  const [annual, setAnnual] = useState(true);
  const [benefitProgress, setBenefitProgress] = useState(0);
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const benefitRail = useRef<HTMLDivElement>(null);
  const moveBenefits = (direction: -1 | 1) => benefitRail.current?.scrollBy({ left: direction * benefitRail.current.clientWidth * .72, behavior: "smooth" });
  const price = (plan: number) => `$${prices[plan][size][annual ? 0 : 1].toLocaleString()}`;
  const alt = (plan: number) => annual ? `or $${prices[plan][size][1]}/mo billed monthly` : `or $${prices[plan][size][0].toLocaleString()}/yr paid annually`;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <main className={`${styles.page} ${fontClassName}`}>
    <InteriorEffects />
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Total Power Generators home">
        <span className="header-logo-lockup">
          <Image className="brand-logo" src="/logo.svg" alt="Total Power Generators" width={689} height={240} priority />
          <Image className="brand-logo brand-logo-color" src="/logo.svg" alt="" width={689} height={240} aria-hidden="true" priority />
        </span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/generators">Generators</Link>
        <Link href="/installation">Installation</Link>
        <Link className="active-nav" aria-current="page" href="/maintenance">Maintenance</Link>
        <Link href="/financing">Financing</Link>
        <Link href="/service-area">Service Area</Link>
        <Link href="/about">About</Link>
        <Link href="/builders">Builders</Link>
      </nav>
      <Link className="header-cta" href="/quote">Get a Free Quote <Arrow /></Link>
      <MobileNav />
    </header>

    <section className={styles.hero}>
      <Image data-parallax src="/hero/Maintenance. Ready when it matters.png" fill priority sizes="100vw" alt="Total Power generator maintenance technician at a South Florida home" />
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}><p className={styles.kicker}>Maintenance plans</p><h1>Ready when it matters.</h1><p className={styles.lede}>Three plans for year-round confidence.</p><div className={styles.actions}><a className={styles.primary} href="#plans">Choose Your Plan <Arrow /></a><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div>
      <div className={styles.response}><p className={styles.kicker}>Guaranteed response, in writing</p>{plans.map(p => <a href="#plans" key={p.name}><strong>{p.name}</strong><span><b>{p.response}</b> hrs</span></a>)}</div>
    </section>

    <section className={styles.pricing} id="plans" data-reveal><div className={styles.container}>
      <div className={styles.sectionHead}><div><h2>Pick your size.<br />Pick your plan.</h2><p>Clear, published pricing. Know what you’ll pay upfront.</p></div></div>
      <div className={styles.sizes}><div><span className={styles.controlLabel}>Generator size</span><p>Prices update for your unit.</p></div><div className={styles.billingControl}><span className={styles.controlLabel}>Billing</span><div className={styles.segmented}><button aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <small>· save ~8%</small></button><button aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button></div></div><div className={styles.sizeOptions}>{sizes.map((label, i) => <button aria-pressed={size === i} onClick={() => setSize(i)} key={label}><b>{label}</b><small>from ${prices[0][i][annual ? 0 : 1].toLocaleString()}/{annual ? "yr" : "mo"}</small></button>)}</div></div>
      <div className={styles.planGrid}>{plans.map((p, i) => <article className={p.featured ? styles.featured : ""} key={p.name}>{p.featured && <em>Most complete</em>}<p className={styles.cardLabel}>{p.label}</p><h3>{p.name}</h3><div className={styles.price}>{price(i)} <span>/{annual ? "yr" : "mo"}</span></div><p className={styles.alt}>{alt(i)} · {sizes[size]}</p><hr /><ul>{p.features.map(f => <li key={f}><Check /> <span>{f}</span></li>)}</ul><Link href={`/quote?need=Maintenance&plan=${encodeURIComponent(`${p.name} · ${sizes[size]} · ${annual ? "Annual" : "Monthly"}`)}`}>Choose {p.name.replace("Total ", "")} <Arrow /></Link><Link className={styles.restrictions} href="/terms">Restrictions apply</Link></article>)}</div>
    </div></section>

    <section className={styles.compare}><div className={styles.container}><div className={styles.sectionHead}><div><p className={styles.kicker}>Compare plans</p><h2>Every detail,<br />side by side.</h2></div><p>Showing prices for <b>{sizes[size]}</b> · billed {annual ? "annually" : "monthly"}</p></div><div className={styles.tableWrap}><table><thead><tr><th>Plan features</th>{plans.map((p,i)=><th key={p.name}>{p.name}<small>{price(i)}/{annual ? "yr" : "mo"}</small></th>)}</tr></thead><tbody>{comparison.map(row=><tr key={row[0]}>{row.map((cell,i)=><th scope={i === 0 ? "row" : undefined} key={i}>{cell}</th>)}</tr>)}</tbody></table></div></div></section>

    <section className={styles.monitor}><div className={styles.container}><div className={styles.monitorIntro}><p className={styles.kicker}>24/7 remote monitoring</p><h2>You get the alert.<br /><span>We’re already on it.</span></h2></div><div className={styles.monitorConsole}><div className={styles.monitorPlans}><article><span>Essentials & Care</span><strong>+$18<small>/mo</small></strong><p>Flat monthly add-on.</p></article><article><span>Total Protect</span><strong>Included</strong><p>Plus a pre-storm visit.</p></article></div><div className={styles.alertFlow}><i><BellRing aria-hidden="true" /></i><p><b>We receive your alert too.</b><br />Then schedule the fix.</p></div></div></div></section>

    <section className={styles.benefits}><div className={styles.benefitsInner}><div className={styles.benefitsTop}><div><p className={styles.kicker}>Built for hurricane season</p><h2>Why South Florida<br />homeowners choose us.</h2></div><div className={styles.benefitControls}><button type="button" onClick={() => moveBenefits(-1)} aria-label="Previous benefit"><ChevronLeft /></button><button type="button" onClick={() => moveBenefits(1)} aria-label="Next benefit"><ChevronRight /></button></div></div><div ref={benefitRail} className={styles.benefitRail} onScroll={(event) => { const rail = event.currentTarget; const max = rail.scrollWidth - rail.clientWidth; setBenefitProgress(max > 0 ? rail.scrollLeft / max : 0); }}>{benefits.map(({ title, copy, detail, Icon }) => { const expanded = expandedBenefit === title; return <article className={expanded ? styles.expandedBenefit : ""} key={title}><Icon className={styles.benefitIcon} aria-hidden="true" /><div className={styles.benefitCopy}><div className={styles.benefitText}><div className={styles.benefitPrimary} aria-hidden={expanded}><h3>{title}</h3><p>{copy}</p></div><div className={styles.benefitDetail} aria-hidden={!expanded}><strong>Why it matters</strong><p>{detail}</p></div></div><button className={styles.benefitToggle} type="button" aria-expanded={expanded} aria-label={`${expanded ? "Hide" : "Show"} details for ${title}`} onClick={() => setExpandedBenefit(expanded ? null : title)}><CirclePlus aria-hidden="true" /></button></div></article>; })}</div><div className={styles.railProgress} aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(.18, benefitProgress)})` }} /></div></div></section>

    <div className={styles.ctaBand}><section className="closing-section" data-reveal>
      <Image className="closing-background" src="/pics/cta-section.png" alt="A Total Power technician arriving at a South Florida home" fill sizes="100vw" />
      <div className="closing-shade" />
      <div className="closing-content"><span className="closing-rule" aria-hidden="true" /><h2>Ready every time.</h2><h3 className="closing-response">Not most of the time.</h3><p>We’ll answer your questions and help you choose the right maintenance plan for your home.</p><div className="dual-actions light-actions"><a className="primary-cta" href="#plans">Choose Your Plan <Arrow /></a><a className="phone-link" href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div></div>
    </section><div className="closing-person" aria-hidden="true"><Image src="/pics/cta.png" alt="" width={575} height={977} /></div></div>

    <footer className="site-footer"><div className="footer-lead"><Link className="brand footer-brand" href="/" aria-label="Total Power Generators home"><Image className="brand-logo" src="/logo.svg" alt="Total Power Generators" width={689} height={240} /></Link><p>Total Power &amp; Gas Contractors. Home generators, installed and maintained by one local crew since 2009.</p></div><div className="footer-column"><b>Explore</b>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">FAQ</Link><Link href="/terms">Terms &amp; Conditions</Link></div><div className="footer-column"><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:Contact@totalpowergenerators.com">Contact@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span><Link href="/service-repair">Service &amp; Repair</Link></div><small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power &amp; Gas Contractors</small></footer>
  </main>;
}
