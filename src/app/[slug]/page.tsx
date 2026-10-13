import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { pages } from "./content";
import styles from "./page.module.css";
import InteriorEffects from "./interior-effects";
import { FeatureIcon } from "./feature-icons";
import ServiceAreaMap from "./service-area-map";

const nav = [["Generators", "/generators"], ["Installation", "/installation"], ["Maintenance", "/maintenance"], ["Financing", "/financing"], ["Service Area", "/service-area"], ["About", "/about"], ["Builders", "/builders"]];
const photos = ["/pics/image-1791572987018.png", "/pics/image-1791573187812.png", "/pics/image-1791573202813.png"];
const manropeExtraBold = Manrope({ weight: "800", subsets: ["latin"], variable: "--font-manrope-extra-bold" });

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

function HeroTitle({ title }: { title: string }) {
  const sentences = title.match(/^(.+?[.!?])\s+(.+)$/);
  if (!sentences) return <>{title}</>;
  return <>{sentences[1]}<br /><span className={styles.heroTitleSecondary}>{sentences[2]}</span></>;
}

function Header() {
  return <header className={styles.header} data-interior-header><Link href="/" className={styles.logo}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" priority /><Image className={styles.logoColor} src="/logo.svg" width={689} height={240} alt="" aria-hidden="true" priority /></Link><nav>{nav.map(([label, href]) => <Link key={href} href={href}>{label === "Service Area" ? <><span className={styles.fullNavLabel}>Service Area</span><span className={styles.compactNavLabel}>Service</span></> : label}</Link>)}</nav><Link className={styles.headerCta} href="/quote">Get a Free Quote <Arrow /></Link></header>;
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
  const heroPhoto = slug === "financing" ? "/pics/financing.png" : slug === "builders" ? photos[2] : slug === "about" ? photos[1] : photos[0];
  return <main className={`${styles.page} ${styles.secondaryPage} ${manropeExtraBold.variable} ${slug === "financing" ? styles.financingPage : ""} ${slug === "about" ? styles.aboutPage : ""} ${slug === "installation" ? styles.installationPage : styles.standardPage}`}>
    <InteriorEffects />
    <Header />
    <section className={styles.hero}><Image data-parallax src={heroPhoto} fill priority sizes="100vw" alt="Total Power crew serving a South Florida home" /><div className={styles.heroShade} /><div className={styles.heroCopy}><span>{page.eyebrow}</span><h1><HeroTitle title={page.title} /></h1>{page.intro && <p>{slug === "installation" ? <>Gas, electrical and permits.<br />One team handles it all.</> : page.intro}</p>}<div className={styles.actions}><Link href={slug === "quote" ? "#quote-form" : "/quote"}>{slug === "financing" ? <>Apply with <Image className={styles.partnerLogo} src="/synchronyX.png" width={524} height={116} alt="Synchrony" /></> : page.cta ?? "Get a Free Quote"} <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div><div className={styles.proof}><span>Since 2009</span><span>Licensed gas + electrical</span><span>Generac PowerPro Elite Plus</span></div></section>
    {slug === "quote" && <div id="quote-form"><QuoteForm /></div>}
    {page.sections.map((section, index) => {
      if (slug === "service-area" && index === 0) {
        return <ServiceAreaMap key={section.title} />;
      }

      if (slug === "service-area" && index === 1) {
        return <section data-reveal key={section.title} className={styles.serviceCheckSection}>
          <div className={styles.serviceCheckCopy}>
            <span>{section.kicker}</span>
            <h2>Tell us where<br />you live.</h2>
            <p>{section.body}</p>
          </div>
          <form className={styles.serviceCheckCard} action="/quote">
            <div className={styles.serviceCheckIcon} aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 44s14-13.1 14-26A14 14 0 1 0 10 18c0 12.9 14 26 14 26Z" /><circle cx="24" cy="18" r="5" /></svg></div>
            <span>Check your address</span>
            <h3>Are we in your neighborhood?</h3>
            <label htmlFor="service-address">Home address</label>
            <div className={styles.serviceCheckField}>
              <input id="service-address" name="address" autoComplete="street-address" placeholder="Enter your street address" required />
              <button type="submit" aria-label="Check address"><Arrow /></button>
            </div>
            <small>We’ll confirm coverage and help schedule your free assessment.</small>
          </form>
        </section>;
      }

      if (slug === "reviews" && index === 0) {
        return <section data-reveal key={section.title} className={styles.reviewShowcase}><div className={styles.reviewAside}><Image className={styles.reviewPerson} src="/pics/cta.png" width={575} height={977} alt="Total Power technician" /><div className={styles.reviewAsideCopy}><span>Customer reputation</span><h2>{section.title}</h2><p>{section.body}</p><div className={styles.reviewArrows} aria-hidden="true"><button tabIndex={-1}>←</button><button tabIndex={-1}>→</button></div></div></div><div className={styles.reviewRail}>{[
          ["Customer story", "Clear communication from the first visit through final testing.", "Miami-Dade homeowner"],
          ["Customer story", "One local team coordinated the generator, gas, electrical and permits.", "Broward homeowner"],
          ["Customer story", "Recent homeowner references are available from our team.", "South Florida homeowner"],
        ].map(([label, quote, person]) => <article key={person}><div><strong>5.0</strong><span aria-label="Five stars">★★★★★</span></div><blockquote>{quote}</blockquote><footer><i>{person.slice(0,1)}</i><p><b>{person}</b><small>{label}</small></p></footer></article>)}</div></section>;
      }

      if (section.features && section.features.length > 0) {
        return (
          <section data-reveal key={section.title} className={`${styles.section} ${styles.featuresSection} ${slug === "installation" ? styles.installationFeatures : ""}`}>
            <div className={styles.featuresIntro}>
              {section.kicker && <span>{section.kicker}</span>}
              <h2>
                {section.title.includes(". ") ? (
                  <>
                    <span className={styles.featureTitleLead}>{section.title.split(". ")[0]}.</span><br />
                    <span>{section.title.split(". ").slice(1).join(". ")}</span>
                  </>
                ) : section.title}
              </h2>
              {section.body && <p>{section.body}</p>}
            </div>
            <div className={styles.featuresGrid}>
              {section.features.map((feature) => (
                <article key={feature.title} className={styles.featureCard}>
                  <div className={styles.featureIconWrap}>
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>
        );
      }

      return (
        <section data-reveal key={section.title} className={`${styles.section} ${section.variant ? styles[section.variant] : ""} ${!section.items && section.variant !== "image" && !(slug === "financing" && index === 1) ? styles.statementSection : ""} ${section.items && section.variant !== "faq" && section.variant !== "plans" ? styles.listSection : ""} ${slug === "financing" && index === 1 ? styles.sideImageSection : ""} ${section.sideImage ? styles.installationSideSection : ""} ${section.kicker === "The process" ? styles.processSection : ""} ${slug === "installation" && index === 0 ? styles.installationIntro : ""}`}>
          {section.variant === "image" && slug !== "about" && <Image data-parallax src={photos[(index + 1) % photos.length]} fill sizes="100vw" alt="Total Power generator installation in South Florida" />}
          <div className={styles.sectionIntro}>
            <span>{section.kicker}</span>
            <h2>{section.sideImage ? <>When one team<br />owns every trade,<br /><span className={styles.introGradient}>everything fits.</span></> : section.title.includes(". ") ? <>{section.title.split(". ")[0]}.<br />{section.title.split(". ").slice(1).join(". ")}</> : section.title}</h2>
            {section.body && <p>{section.body}</p>}
          </div>
          {slug === "about" && section.variant === "image" && <div className={styles.crewCards} aria-label="Total Power installation crew"><article><Image src="/pics/image-1791573216228.png" fill sizes="(max-width: 800px) 82vw, 22vw" alt="Total Power technician working on a home generator" /></article><article><Image src="/pics/image-1791572987018.png" fill sizes="(max-width: 800px) 82vw, 22vw" alt="Total Power crew member servicing a standby generator" /></article><article><Image src="/pics/image-1791573202813.png" fill sizes="(max-width: 800px) 82vw, 22vw" alt="Total Power crew completing a generator installation" /></article></div>}
          {section.sideImage && <div className={styles.installationSideImage}><Image data-parallax src={photos[0]} fill sizes="(max-width: 800px) 100vw, 50vw" alt="Total Power crew on site" /></div>}
          {slug === "financing" && index === 1 && <div className={styles.sectionSideImage}><Image data-parallax src="/pics/fin-content.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="A South Florida home protected by standby power" /></div>}
          {section.items && section.variant === "faq" && <div className={styles.faqList}>{section.items.map((item) => { const [q, a] = item.split("|"); return <details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>; })}</div>}
          {section.items && section.variant !== "faq" && <div className={styles.itemGrid}>{section.items.map((item, itemIndex) => {
            const visual = false;
            const isProcess = section.kicker === "The process";
            return <article key={item} className={visual ? styles.visualCard : undefined}>
              {visual && <Image src={photos[(index + itemIndex) % photos.length]} fill sizes="(max-width: 800px) 100vw, 32vw" alt="Total Power crew at work" />}
              {visual && <i aria-hidden="true" />}
              {isProcess && <span className={styles.processNum}>{String(itemIndex + 1).padStart(2, "0")}</span>}
              <p>{slug === "financing" ? <><strong>{item.split(". ")[0]}.</strong><small>{item.split(". ").slice(1).join(". ")}</small></> : item}</p>
            </article>;
          })}</div>}
        </section>
      );
    })}
    <div className={styles.closingWrapper}>
      <section data-reveal className={styles.closing}><Image data-parallax src="/pics/cta-section.png" fill sizes="100vw" alt="Total Power technician arriving at a South Florida home" /><div className={styles.closingShade} /><div className={styles.closingInner}><i /><h2>Call us on a sunny day.</h2><h3>Thank yourself in a storm.</h3><p>Permits and installs take time, and schedules fill fast once a storm is on the map. Book your assessment while the sky is clear.</p><div><Link href="/quote">Get a Free Quote <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div></div></section><div className={styles.closingPerson} aria-hidden="true"><Image src="/pics/cta.png" alt="" width={575} height={977} /></div>
    </div>
    <Footer />
  </main>;
}

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
