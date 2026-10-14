"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import MobileNav, { siteNav } from "../../components/MobileNav";
import styles from "./page.module.css";

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;

export default function TermsContent() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reducedMotion ? null : new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, wheelMultiplier: .9 });
    return () => { window.removeEventListener("scroll", onScroll); lenis?.destroy(); };
  }, []);

  return <main className={`site-shell ${styles.page}`}>
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Total Power Generators home"><span className="header-logo-lockup"><Image className="brand-logo" src="/logo.svg" alt="Total Power Generators" width={689} height={240} priority /><Image className="brand-logo brand-logo-color" src="/logo.svg" alt="" width={689} height={240} aria-hidden="true" priority /></span></Link>
      <nav className="main-nav" aria-label="Main navigation">{siteNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="header-cta" href="/quote">Get a Free Quote <Arrow /></Link><MobileNav />
    </header>
    <section className={styles.hero}><Image className={styles.heroMark} src="/logomark.svg" width={250} height={240} alt="" aria-hidden="true" priority /><div className={styles.heroCopy}><span>Legal</span><h1>Terms &amp;<br /><em>Conditions.</em></h1><p>Important details about Total Power services, maintenance plans and coverage.</p></div><div className={styles.heroMeta}><span>Last updated</span><strong>October 2026</strong></div></section>
    <section className={styles.content}><aside><span>On this page</span><a href="#plans">Maintenance plans</a><a href="#eligibility">Eligibility &amp; coverage</a><a href="#contact">Questions</a></aside><article>
      <p className={styles.intro}>Maintenance plan features, pricing, response times, replacement benefits and repair allowances are subject to eligibility, equipment condition, service-area availability and the final written plan agreement.</p>
      <section id="plans"><h2>Maintenance plan restrictions</h2><p>Detailed plan restrictions and eligibility terms will be published here when finalized by Total Power. The written agreement provided at enrollment will govern your coverage.</p></section>
      <section id="eligibility"><h2>Eligibility and coverage</h2><p>Plan availability may depend on generator model, age, condition, installation quality and location. A system inspection may be required before coverage begins. Published response times and benefits apply only as described in the final plan agreement.</p></section>
      <section><h2>Pricing and service</h2><p>Displayed prices are starting prices and may vary by generator size. Monthly and annual billing options are subject to the selected plan and final enrollment terms. Additional repairs or parts outside plan coverage require approval.</p></section>
      <section id="contact"><h2>Questions before you enroll?</h2><p>We’ll explain the options and confirm what applies to your generator before you commit.</p><div className={styles.actions}><a href="tel:+13054719010">Call (305) 471-9010 <Arrow /></a><a href="mailto:hello@totalpowergenerators.com">Email our team</a></div></section>
    </article></section>
    <section className={styles.cta}><h2>Choose with confidence.</h2><p>Compare published pricing and find the maintenance plan that fits your system.</p><Link href="/maintenance">View Maintenance Plans <Arrow /></Link></section>
    <footer className={styles.footer}><div className={styles.footerLead}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" /><p>Home generators, installed and maintained by one local crew since 2009.</p></div><div><b>Explore</b>{siteNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">FAQ</Link><Link href="/terms">Terms &amp; Conditions</Link></div><div><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:hello@totalpowergenerators.com">hello@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span></div><small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power &amp; Gas Contractors</small></footer>
  </main>;
}
