import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope } from "next/font/google";
import { pages } from "./content";
import styles from "./page.module.css";
import InteriorEffects from "./interior-effects";
import { FeatureIcon } from "./feature-icons";
import ServiceAreaMap from "./service-area-map";
import MobileNav from "../../components/MobileNav";
import QuoteForm from "./quote-form";
import ServiceAreaChecker from "./service-area-checker";

const nav = [["Generators", "/generators"], ["Installation", "/installation"], ["Maintenance", "/maintenance"], ["Financing", "/financing"], ["Service Area", "/service-area"], ["About", "/about"], ["Builders", "/builders"]];
const photos = ["/pics/image-1791572987018.png", "/pics/image-1791573187812.png", "/pics/image-1791573202813.png"];
const manropeExtraBold = Manrope({ weight: "800", subsets: ["latin"], variable: "--font-manrope-extra-bold" });
const seoTitles: Record<string, string> = {
  generators: "Whole-Home Standby Generators in South Florida",
  installation: "Standby Generator Installation in South Florida",
  maintenance: "Generator Maintenance & Monitoring Plans",
  "service-repair": "Generator Service & Repair in South Florida",
  financing: "Home Generator Financing Options",
  "service-area": "South Florida Generator Service Area",
  about: "About Our Licensed Generator Installation Team",
  reviews: "South Florida Generator Customer Reviews",
  builders: "Generator Installation for Builders & Trade Partners",
  faq: "Home Generator Frequently Asked Questions",
  quote: "Free In-Home Generator Assessment",
};

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>; }

function HeroTitle({ title }: { title: string }) {
  const sentences = title.match(/^(.+?[.!?])\s+(.+)$/);
  if (!sentences) return <>{title}</>;
  return <>{sentences[1]}<br /><span className={styles.heroTitleSecondary}>{sentences[2]}</span></>;
}

function Header({ activeSlug }: { activeSlug: string }) {
  return <header className={styles.header} data-interior-header><Link href="/" className={styles.logo}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" priority /><Image className={styles.logoColor} src="/logo.svg" width={689} height={240} alt="" aria-hidden="true" priority /></Link><nav>{nav.map(([label, href]) => { const active = href === `/${activeSlug}`; return <Link className={active ? styles.activeNav : undefined} aria-current={active ? "page" : undefined} key={href} href={href}>{label === "Service Area" ? <><span className={styles.fullNavLabel}>Service Area</span><span className={styles.compactNavLabel}>Service</span></> : label}</Link>; })}</nav><Link className={styles.headerCta} href="/quote">Get a Free Quote <Arrow /></Link><MobileNav /></header>;
}

function Footer() {
  return <footer className={styles.footer}><div className={styles.footerLead}><Image src="/logo.svg" width={689} height={240} alt="Total Power Generators" /><p>Total Power & Gas Contractors. Home generators, installed and maintained by one local crew since 2009.</p></div><div><b>Explore</b>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/faq">FAQ</Link><Link href="/terms">Terms &amp; Conditions</Link></div><div><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:hello@totalpowergenerators.com">hello@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span><Link href="/service-repair">Service & Repair</Link></div><small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power & Gas Contractors</small></footer>;
}

function GeneratorContent() {
  return <>
    <section data-reveal className={`${styles.generatorFlow} ${styles.generatorSection}`}>
      <div className={styles.generatorSectionHead}><span>Why a generator</span><h2>The grid goes down.<br /><em>Your home stays on.</em></h2><p>From hurricanes to everyday outages, backup power keeps your home, family and essentials running safely and automatically.</p></div>
      <div className={styles.generatorSteps}>
        {[['Automatic protection', 'Detects outages and powers your home within seconds.'], ['Total home coverage', 'Keep your A/C, fridge, internet and more running.'], ['Peace of mind', 'Professional installation and long-term local support.']].map(([title, copy], index) => <article key={title}><span className={styles.generatorBenefitNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>)}
      </div>
    </section>

    <section data-reveal className={`${styles.generatorCoverage} ${styles.generatorSection}`}>
      <div className={styles.generatorSectionHead}><span>Coverage</span><h2>Power everything.<br />Or only what matters.</h2><p>We size the system around your home, your electrical service and how you want to live through an outage—not from a chart over the phone.</p></div>
      <div className={styles.coverageCards}>
        <article><Image src="/pics/image-1791573187812.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="A South Florida family enjoying uninterrupted whole-home power" /><i /><div><b>Whole-home generators</b><h3>Life continues normally.</h3><p>Uninterrupted power for your entire home, central A/C included.</p><Link href="/quote">Explore whole-home power <Arrow /></Link></div></article>
        <article><Image src="/protected-home.png" fill sizes="(max-width: 800px) 100vw, 50vw" alt="A South Florida home protected during a storm" /><i /><div><b>Essential power solutions</b><h3>The priorities stay powered.</h3><p>Keep the circuits that matter most running through the outage.</p><Link href="/quote">Explore essential power <Arrow /></Link></div></article>
      </div>
    </section>

    <section data-reveal className={`${styles.generatorFuel} ${styles.generatorSection}`}>
      <div className={styles.generatorSectionHead}><span>Fuel options</span><h2>Natural gas<br />or propane.</h2><p>Our licensed gas team handles the complete fuel connection. If your home has natural gas, we tie into the line. If it doesn’t, we size and install the propane system too.</p><Link href="/installation">See how installation works <Arrow /></Link></div>
      <div className={styles.fuelVisual}><Image src="/generator-detail.png" fill sizes="(max-width: 800px) 100vw, 56vw" alt="A standby generator installed beside a South Florida home" /></div>
    </section>

    <section data-reveal className={`${styles.generatorBrands} ${styles.generatorSection}`}>
      <div className={styles.generatorSectionHead}><span>Equipment</span><h2>The right generator.<br /><em>Not just the biggest one.</em></h2><p>We install and service trusted standby systems from Generac and Kohler. As a Generac PowerPro Elite Plus Dealer with factory-trained technicians, we match the equipment to your home, fuel supply and budget.</p></div>
      <div className={styles.brandProof}><div><strong>Generac</strong><span>PowerPro Elite Plus Dealer</span></div><div><strong>Kohler</strong><span>Installed and serviced locally</span></div><div><strong>Briggs &amp; Stratton</strong><span>Reliable standby power systems</span></div></div>
    </section>
  </>;
}

const builderBenefits = [
  ["01", "Builder pricing.", "Wholesale or volume pricing on equipment and installs."],
  ["02", "One dedicated contact.", "A single person managing every lot and every project."],
  ["03", "Spec support.", "Generator sizing and load calculations from your plans."],
  ["04", "On your timeline.", "Gas and electrical rough-in coordinated with your GC, with the final install timed to your closing."],
  ["05", "Permits, handled.", "Filing, inspections and follow-up with the city, done by Total Power."],
  ["06", "After closing.", "Warranty registration before handover, and maintenance plans offered to the homeowner."],
];

function BuilderContent() {
  return <>
    <section data-reveal className={styles.builderProgram}>
      <div className={styles.builderProgramIntro}>
        <span>One partner. Every lot.</span>
        <h2>Standby power,<br /><em>built into the plan.</em></h2>
        <p>From first takeoff to homeowner handover, one local team keeps equipment, trades, permits and inspections moving with the build.</p>
      </div>
      <div className={styles.builderBenefits}>
        {builderBenefits.map(([number, title, copy]) => <article key={title}>
          <span>{number}</span>
          <div><h3>{title}</h3><p>{copy}</p></div>
        </article>)}
      </div>
    </section>

    <section data-reveal id="builder-inquiry" className={styles.builderInquiry}>
      <div className={styles.builderInquiryIntro}>
        <span>Builder inquiry</span>
        <h2>Tell us what<br />you’re building.</h2>
        <p>Share the basics and our builder team will follow up to talk plans, pricing and schedule.</p>
        <a href="tel:+13054719010">Prefer to call? <strong>(305) 471-9010</strong></a>
      </div>
      <form className={styles.builderForm}>
        <label>Full name<input required name="name" autoComplete="name" /></label>
        <label>Company<input required name="company" autoComplete="organization" /></label>
        <label>Email<input required type="email" name="email" autoComplete="email" /></label>
        <label>Phone<input required type="tel" name="phone" autoComplete="tel" /></label>
        <label>Project location<input name="location" autoComplete="street-address" /></label>
        <label>Homes or lots<input name="project-size" inputMode="numeric" /></label>
        <label className={styles.builderFormWide}>Project notes <span>(optional)</span><textarea name="notes" rows={4} placeholder="Timeline, plan stage or anything else we should know" /></label>
        <button type="submit">Talk to Our Builder Team <Arrow /></button>
      </form>
    </section>
  </>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = pages[slug];
  if (!page) return { robots: { index: false, follow: false } };
  const title = seoTitles[slug] ?? page.eyebrow;
  const description = page.intro ?? page.title;
  const url = `/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "A South Florida home protected by a standby generator" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}

export default async function InteriorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug]; if (!page) notFound();
  const heroPhoto = slug === "generators" ? "/hero/WHEN THE GRID STOPS. YOUR HOME DOESN’T.png" : slug === "installation" ? "/hero/ONE CREW. START TO FINISH.png" : slug === "financing" ? "/hero/Financing POWER NOW. PAY OVER TIME.png" : slug === "service-area" ? "/hero/service-area.png" : slug === "about" ? "/hero/about.png" : slug === "builders" ? "/hero/builders.png" : slug === "quote" ? "/hero-quote.png" : photos[0];
  const heroAlt = slug === "generators" ? "A standby generator protecting a South Florida waterfront home after a storm" : slug === "financing" ? "A South Florida home with financing available for standby generator installation" : slug === "service-area" ? "Aerial view of South Florida coastal communities served by Total Power" : slug === "about" ? "The Total Power generator installation crew at a South Florida home" : slug === "builders" ? "Builder and generator specialists coordinating a South Florida home project" : slug === "quote" ? "A Total Power specialist meeting homeowners for a generator assessment" : "Total Power crew serving a South Florida home";
  return <main className={`${styles.page} ${styles.secondaryPage} ${manropeExtraBold.variable} ${slug === "generators" ? styles.generatorPage : ""} ${slug === "service-area" ? styles.serviceAreaPage : ""} ${slug === "builders" ? styles.buildersPage : ""} ${slug === "quote" ? styles.quotePage : ""} ${slug === "financing" ? styles.financingPage : ""} ${slug === "about" ? styles.aboutPage : ""} ${slug === "installation" ? styles.installationPage : styles.standardPage}`}>
    <InteriorEffects />
    <Header activeSlug={slug} />
    <section className={styles.hero}><Image data-parallax src={heroPhoto} fill priority sizes="100vw" alt={heroAlt} /><div className={styles.heroShade} /><div className={styles.heroCopy}><span>{page.eyebrow}</span><h1><HeroTitle title={page.title} /></h1>{page.intro && <p>{slug === "installation" ? <>Gas, electrical and permits.<br />One team handles it all.</> : page.intro}</p>}<div className={styles.actions}>{slug === "financing" ? <a href="https://etail.mysynchrony.com/eapply/eapply.action?client=Generac&uniqueId=287888F10090B2C3873347796F2DA7DE169BFA96C73A4429" target="_blank" rel="noopener noreferrer">See Your Monthly Payment <Arrow /></a> : <Link href={slug === "quote" ? "#quote-form" : slug === "builders" ? "#builder-inquiry" : "/quote"}>{page.cta ?? "Get a Free Quote"} <Arrow /></Link>}<a href="tel:+13054719010">Or call (305) 471-9010</a></div></div><div className={styles.proof}><span>Since 2009</span><span>Licensed gas + electrical</span><span>Generac PowerPro Elite Plus</span></div></section>
    {slug === "quote" && <div id="quote-form"><Suspense fallback={<div className={styles.formSection}>Loading quote form…</div>}><QuoteForm className={styles.formSection} gridClassName={styles.formGrid} /></Suspense></div>}
    {slug === "generators" && <GeneratorContent />}
    {slug === "builders" && <BuilderContent />}
    {slug !== "generators" && slug !== "builders" && page.sections.map((section, index) => {
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
          <ServiceAreaChecker styles={styles} />
        </section>;
      }

      if (slug === "reviews" && index === 0) {
        return <section data-reveal key={section.title} className={styles.reviewShowcase}><div className={styles.reviewAside}><Image className={styles.reviewPerson} src="/pics/cta.png" width={575} height={977} alt="Total Power technician" /><div className={styles.reviewAsideCopy}><span>Customer reputation</span><h2>{section.title}</h2><p>{section.body}</p><div className={styles.reviewArrows} aria-hidden="true"><button tabIndex={-1}>←</button><button tabIndex={-1}>→</button></div></div></div><div className={styles.reviewRail}>{[
          ["Customer story", "Clear communication from the first visit through final testing.", "Miami-Dade homeowner"],
          ["Customer story", "One local team coordinated the generator, gas, electrical and permits.", "Broward homeowner"],
          ["Customer story", "Recent homeowner references are available from our team.", "South Florida homeowner"],
        ].map(([, quote, person], index) => <article key={person}><div><strong>{[4.8, 4.9, 5.0][index].toFixed(1)}</strong><span aria-label="Five stars">★★★★★</span></div><blockquote>{quote}</blockquote><footer><i>{person.slice(0,1)}</i><p><b>{person}</b></p></footer></article>)}</div></section>;
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
            <h2>{section.kicker === "The process" ? <><span className={styles.processTitleLead}>Five steps.</span><br /><span className={styles.processTitleAccent}>Zero runaround.</span></> : section.sideImage ? <>When one team<br />owns every trade,<br /><span className={styles.introGradient}>everything fits.</span></> : section.title.includes(". ") ? <>{section.title.split(". ")[0]}.<br />{section.title.split(". ").slice(1).join(". ")}</> : section.title}</h2>
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
              {isProcess ? <><h3>{item.split("|")[0]}</h3><p>{item.split("|")[1]}</p><Arrow /></> : <p>{slug === "financing" ? <><strong>{item.split(". ")[0]}.</strong><small>{item.split(". ").slice(1).join(". ")}</small></> : item}</p>}
            </article>;
          })}</div>}
        </section>
      );
    })}
    {slug !== "builders" && <div className={styles.closingWrapper}>
      <section data-reveal className={styles.closing}><Image data-parallax src="/pics/cta-section.png" fill sizes="100vw" alt="Total Power technician arriving at a South Florida home" /><div className={styles.closingShade} /><div className={styles.closingInner}><i /><h2>{slug === "generators" ? "Start with a free in-home assessment." : "Call us on a sunny day."}</h2><h3>{slug === "generators" ? "No obligation. Just expert advice." : "Thank yourself in a storm."}</h3><p>{slug === "generators" ? "We’ll visit your home, understand what you want to keep powered and recommend the right system for your home, fuel and budget." : "Permits and installs take time, and schedules fill fast once a storm is on the map. Book your assessment while the sky is clear."}</p><div><Link href="/quote">Get a Free Quote <Arrow /></Link><a href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div></div></section><div className={styles.closingPerson} aria-hidden="true"><Image src="/pics/cta.png" alt="" width={575} height={977} /></div>
    </div>}
    <Footer />
  </main>;
}

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
