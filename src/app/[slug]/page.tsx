import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pages } from "./content";
import styles from "./page.module.css";

const nav = [["Generators", "/generators"], ["Installation", "/installation"], ["Maintenance", "/maintenance"], ["Financing", "/financing"], ["Service Area", "/service-area"], ["About", "/about"], ["Builders", "/builders"]];
const photos = ["/pics/image-1791572987018.png", "/pics/image-1791573187812.png", "/pics/image-1791573202813.png"];

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

function Header() {
  return <header className={styles.header}><Link href="/" className={styles.logo}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" priority /></Link><nav>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><Link className={styles.headerCta} href="/quote">Get a Free Quote <Arrow /></Link></header>;
}

function Footer() {
  return <footer className={styles.footer}><div className={styles.footerLead}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" /><p>Total Power & Gas Contractors. Home generators, installed and maintained by one local crew since 2009.</p></div><div><b>Explore</b>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">FAQ</Link></div><div><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:hello@totalpowergenerators.com">hello@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span><Link href="/service-repair">Service & Repair</Link></div><small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power & Gas Contractors</small></footer>;
}

function QuoteForm() {
  return <section className={styles.formSection}><form><div className={styles.formGrid}><label>Name<input required name="name" /></label><label>Phone<input required type="tel" name="phone" /></label><label>Email<input required type="email" name="email" /></label><label>Home address<input required name="address" /></label><label>Fuel<select name="fuel" defaultValue=""><option value="" disabled>Select one</option><option>Natural gas</option><option>Propane</option><option>Not sure</option></select></label><label>I need<select name="need" defaultValue=""><option value="" disabled>Select one</option><option>New install</option><option>Maintenance</option><option>Service</option></select></label><label>Best time to reach you<input name="best-time" /></label><label>Who referred you? <span>(optional)</span><input name="referral" /></label></div><button type="submit">Request My Free Quote <Arrow /></button><p>Or call <a href="tel:+13054719010">(305) 471-9010</a> · <a href="mailto:hello@totalpowergenerators.com">Email our team</a></p></form></section>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = pages[slug];
  return page ? { title: `${page.eyebrow} | Total Power Generators`, description: page.intro ?? page.title } : {};
}

export default async function InteriorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug]; if (!page) notFound();
  const heroPhoto = slug === "builders" ? photos[2] : slug === "about" ? photos[1] : photos[0];
  return <main className={styles.page}>
    <Header />
    <section className={styles.hero}><Image src={heroPhoto} fill priority sizes="100vw" alt="Total Power crew serving a South Florida home" /><div className={styles.heroShade} /><div className={styles.heroCopy}><span>{page.eyebrow}</span><h1>{page.title}</h1>{page.intro && <p>{page.intro}</p>}<div className={styles.actions}><Link href={slug === "quote" ? "#quote-form" : "/quote"}>{page.cta ?? "Get a Free Quote"} <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div><div className={styles.proof}><span>Since 2009</span><span>Licensed gas + electrical</span><span>Generac PowerPro Elite Plus</span></div></section>
    {slug === "quote" && <div id="quote-form"><QuoteForm /></div>}
    {page.sections.map((section, index) => <section key={section.title} className={`${styles.section} ${section.variant ? styles[section.variant] : ""}`}>
      {section.variant === "image" && <Image src={photos[(index + 1) % photos.length]} fill sizes="100vw" alt="Total Power generator installation in South Florida" />}
      <div className={styles.sectionIntro}><span>{section.kicker}</span><h2>{section.title}</h2>{section.body && <p>{section.body}</p>}</div>
      {section.items && section.variant === "faq" && <div className={styles.faqList}>{section.items.map((item) => { const [q, a] = item.split("|"); return <details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>; })}</div>}
      {section.items && section.variant !== "faq" && <div className={styles.itemGrid}>{section.items.map((item, itemIndex) => {
        const visual = section.variant !== "plans" && itemIndex % 4 === 2;
        return <article key={item} className={visual ? styles.visualCard : undefined}>
          {visual && <Image src={photos[(index + itemIndex) % photos.length]} fill sizes="(max-width: 800px) 100vw, 32vw" alt="Total Power crew at work" />}
          {visual && <i aria-hidden="true" />}
          <span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p>
        </article>;
      })}</div>}
    </section>)}
    <section className={styles.closing}><span>Ready when you are</span><h2>{slug === "installation" ? "Install it before the forecast makes you wish you had." : "Call us on a sunny day. Thank yourself in a storm."}</h2><Link href="/quote">Get a Free Quote <Arrow /></Link><small>Every quote starts with a free in-home assessment. No obligation.</small></section>
    <Footer />
    <a className={styles.chat} href="mailto:hello@totalpowergenerators.com" aria-label="Ask Total Power a question">Questions? <b>Ask us</b></a>
  </main>;
}

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
