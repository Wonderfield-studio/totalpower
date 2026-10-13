import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import styles from "../../[slug]/page.module.css";
import InteriorEffects from "../../[slug]/interior-effects";
import MobileNav from "../../../components/MobileNav";

const cities: Record<string, string> = { miami: "Miami", "fort-lauderdale": "Fort Lauderdale", "boca-raton": "Boca Raton", "boynton-beach": "Boynton Beach" };
const nav = [["Generators", "/generators"], ["Installation", "/installation"], ["Maintenance", "/maintenance"], ["Financing", "/financing"], ["Service Area", "/service-area"], ["About", "/about"], ["Builders", "/builders"]];
const manropeExtraBold = Manrope({ weight: "800", subsets: ["latin"], variable: "--font-manrope-extra-bold" });

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const name = cities[city];
  if (!name) return { robots: { index: false, follow: false } };
  const title = `Home Generator Installation in ${name}, FL`;
  const description = `Whole-home standby generator sizing, permits, installation and maintenance in ${name} from one licensed South Florida team.`;
  const url = `/service-area/${city}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `Standby generator service in ${name}, Florida` }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export function generateStaticParams() { return Object.keys(cities).map((city) => ({ city })); }

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

function Header() {
  return <header className={styles.header} data-interior-header><Link href="/" className={styles.logo}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" priority /><Image className={styles.logoColor} src="/logo.svg" width={689} height={240} alt="" aria-hidden="true" priority /></Link><nav>{nav.map(([label, href]) => <Link key={href} href={href}>{label === "Service Area" ? <><span className={styles.fullNavLabel}>Service Area</span><span className={styles.compactNavLabel}>Service</span></> : label}</Link>)}</nav><Link className={styles.headerCta} href="/quote">Get a Free Quote <Arrow /></Link><MobileNav /></header>;
}

function Footer() {
  return <footer className={styles.footer}><div className={styles.footerLead}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" /><p>Total Power & Gas Contractors. Home generators, installed and maintained by one local crew since 2009.</p></div><div><b>Explore</b>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">FAQ</Link></div><div><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:hello@totalpowergenerators.com">hello@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span><Link href="/service-repair">Service & Repair</Link></div><small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power & Gas Contractors</small></footer>;
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const name = cities[city]; if (!name) notFound();
  return <main className={`${styles.page} ${styles.secondaryPage} ${styles.standardPage} ${manropeExtraBold.variable}`}><InteriorEffects /><Header /><section className={styles.hero}><Image data-parallax src="/pics/image-1791572987018.png" fill priority sizes="100vw" alt={`Total Power generator installation in ${name}`} /><div className={styles.heroShade} /><div className={styles.heroCopy}><span>South Florida service area</span><h1>Home generators in {name}.</h1><p>One local team handles sizing, permits, installation and service.</p><div className={styles.actions}><Link href="/quote">Get a Free Quote <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div></section><section data-reveal className={`${styles.section} ${styles.statementSection}`}><div className={styles.sectionIntro}><span>Local service</span><h2>Built for South Florida homes.</h2><p>Book a free in-home assessment and we’ll recommend the right generator for your home, fuel supply and budget.</p></div></section><div className={styles.closingWrapper}><section data-reveal className={styles.closing}><Image data-parallax src="/pics/cta-section.png" fill sizes="100vw" alt="Total Power technician arriving at a South Florida home" /><div className={styles.closingShade} /><div className={styles.closingInner}><i /><h2>Start with a free visit.</h2><p>Ready when you are.</p><div><Link href="/quote">Get a Free Quote <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div></div></section><div className={styles.closingPerson} aria-hidden="true"><Image src="/pics/cta.png" alt="" width={575} height={977} /></div></div><Footer /></main>;
}
