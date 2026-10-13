import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import MobileNav from "../../components/MobileNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage Concept",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrow}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export default function SecondaryHome() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <video className={styles.heroVideo} autoPlay loop muted playsInline preload="auto">
          <source src="/full.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroShade} />

        <header className={styles.header}>
          <Link className={styles.logo} href="/" aria-label="Total Power Generators home">
            <Image src="/logo.svg" alt="Total Power Generators" width={689} height={240} priority />
          </Link>
          <nav aria-label="Main navigation">
            <a href="#generators">Generators</a>
            <a href="#installation">Installation</a>
            <a href="#process">Process</a>
            <a href="#about">About</a>
          </nav>
          <Link className={styles.compactCta} href="/quote">Free quote <Arrow /></Link>
          <MobileNav />
        </header>

        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>South Florida&apos;s standby power experts</p>
          <h1>Storms don&apos;t<br />schedule. <em>We do.</em></h1>
          <p>Home standby generators, installed before you need one.</p>
          <div className={styles.heroActions}>
            <Link className={styles.lightButton} href="/quote">Get a Free Quote <Arrow /></Link>
            <a className={styles.phone} href="tel:+13054719010">(305) 471-9010</a>
          </div>
        </div>
        <span className={styles.scrollCue}>Scroll down ↓</span>
      </section>

      <section className={styles.intro} id="generators">
        <span className={styles.label}>The promise</span>
        <h2>Power out?<br /><em>Not here.</em></h2>
        <div className={styles.introBody}>
          <p>A standby generator starts on its own the moment the power drops. The A/C keeps running, the fridge stays cold and the Wi-Fi stays on, whether you&apos;re home or halfway around the world.</p>
          <Link className={styles.darkButton} href="/generators">How standby generators work <Arrow /></Link>
        </div>
      </section>

      <section className={styles.capabilities} id="installation">
        <div className={styles.sectionTopline}><span>Everything under one roof</span><span>01 — 04</span></div>
        <div className={styles.capabilityGrid}>
          {[
            ["01", "Generator sizing", "Sized around your home and the way you live."],
            ["02", "Gas + electrical", "Licensed trades, coordinated by one crew."],
            ["03", "Permits", "Filed, tracked and inspected on your behalf."],
            ["04", "Maintenance", "Service plans that keep your system ready."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div className={styles.serviceIcon} aria-hidden="true">✦</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.photoStories} aria-label="Total Power customer and installation stories">
        <div className={styles.sectionTopline}><span>Power, professionally delivered</span><span>South Florida</span></div>
        <div className={styles.photoGrid}>
          <figure className={styles.photoWide}>
            <Image src="/pics/image-1791573187812.png" alt="A South Florida family enjoying their protected home" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>Protected at home</span><span>Whole-home standby power</span></figcaption>
          </figure>
          <figure>
            <Image src="/pics/image-1791573202813.png" alt="A Total Power specialist greeting homeowners after installation" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>One point of contact</span><span>From quote to walkthrough</span></figcaption>
          </figure>
          <figure>
            <Image src="/pics/image-1791573216228.png" alt="A Total Power specialist reviewing an approved permit with homeowners" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>Permits, handled</span><span>No building-department runaround</span></figcaption>
          </figure>
          <figure className={styles.photoWide}>
            <Image src="/pics/image-1791573228545.png" alt="A Total Power service technician arriving at a customer home" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <figcaption><span>Ready when needed</span><span>Sales · Service · Installation</span></figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.imageStatement} id="about">
        <Image src="/pics/image-1791572987018.png" alt="Total Power technician completing a standby generator installation" fill sizes="100vw" />
        <div className={styles.imageShade} />
        <div>
          <span className={styles.label}>The crew</span>
          <h2>The crew that quotes it<br />is the crew that installs it.</h2>
          <Link className={styles.lightButton} href="/about">Meet the crew <Arrow /></Link>
        </div>
      </section>

      <section className={styles.numbers}>
        <div className={styles.numberIntro}>
          <span className={styles.label}>Total Power</span>
          <h2>Built for the day<br />the grid goes quiet.</h2>
        </div>
        <div className={styles.metrics}>
          <div><strong>2009</strong><span>Serving South Florida since</span></div>
          <div><strong>1000s</strong><span>Homes powered</span></div>
          <div><strong>Elite+</strong><span>Generac PowerPro dealer</span></div>
          <div><strong>2</strong><span>Licensed trades, one team</span></div>
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className={styles.sectionTopline}><span>Five steps. Zero runaround.</span><span>The process</span></div>
        {[
          ["01", "Free in-home assessment", "We size the generator to your home and how you live."],
          ["02", "A clear quote", "One price, with financing available if you want it."],
          ["03", "Permits, handled", "We file, track and follow up."],
          ["04", "Install day", "Our crew handles the gas, electrical and connections."],
          ["05", "Walkthrough", "We test the system and show you exactly how it works."],
        ].map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>
        ))}
      </section>

      <section className={styles.closing}>
        <span className={styles.label}>Ready when you are</span>
        <h2>Call us on a sunny day.<br />Thank yourself in a storm.</h2>
        <Link className={styles.darkButton} href="/quote">Get a Free Quote <Arrow /></Link>
      </section>

      <footer className={styles.footer}>
        <div><strong>Total Power Generators</strong><p>Whole-home standby power, professionally installed.</p></div>
        <a href="tel:+13054719010">(305) 471-9010</a>
        <div className={styles.footerLinks}><a href="#generators">Generators</a><a href="#installation">Installation</a><a href="#process">Process</a><a href="#about">About</a></div>
        <div className={styles.footerWordmark}>TOTAL POWER</div>
      </footer>
    </main>
  );
}
