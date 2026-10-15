"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import Lenis from "lenis";
import { ChevronLeft, ChevronRight, Clock3, ShieldCheck, Wrench } from "lucide-react";
import installationImage from "../../public/pics/image-1791572987018.png";
import reviewImage from "../../public/pics/image-1791573216228.png";
import ctaSectionImage from "../../public/pics/cta-section.png";
import { FeatureIcon } from "./[slug]/feature-icons";
import MobileNav from "../components/MobileNav";

const manropeExtraBold = Manrope({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-manrope-extra-bold",
});

const testimonials = [
  ["Clear communication from the first visit through final testing. The team explained the options, kept the project moving and made every step easy to understand.", "Miami-Dade homeowner"],
  ["One local team coordinated the generator, gas, electrical work and permits. We always knew who to call and what would happen next.", "Broward homeowner"],
  ["The installation was carefully planned around our home and completed with close attention to the details that mattered to us.", "South Florida homeowner"],
  ["From the assessment to the final walkthrough, the process felt organized, responsive and handled by people who knew the work.", "Local homeowner"],
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="arrow-icon">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const RevealWords = ({ text, offset = 0, accentLastPunctuation = false }: { text: string; offset?: number; accentLastPunctuation?: boolean }) =>
  text.split(" ").map((word, index, words) => (
    <span className="reveal-word" style={{ transitionDelay: `${(offset + index) * 42}ms`, animationDelay: `${(offset + index) * 42}ms` }} key={`${word}-${index}`}>
      {accentLastPunctuation && index === words.length - 1
        ? <>{word.slice(0, -1)}<span className="headline-period">{word.slice(-1)}</span>{" "}</>
        : <>{word}{" "}</>}
    </span>
  ));

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const finalVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const reviewRailRef = useRef<HTMLDivElement>(null);
  const processRailRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const [heroVariant, setHeroVariant] = useState<"cinematic" | "panel" | "centered" | "fullbleed">("fullbleed");
  const [isScrolled, setIsScrolled] = useState(false);
  const [vanIsArriving, setVanIsArriving] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const solidHero = heroVariant === "panel";

  const moveReviews = (direction: -1 | 1) => {
    const rail = reviewRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  const updateProcessProgress = () => {
    const rail = processRailRef.current;
    if (!rail) return;
    setProcessProgress(rail.scrollWidth > 0 ? Math.min(1, (rail.scrollLeft + rail.clientWidth) / rail.scrollWidth) : 1);
  };

  const moveProcess = (direction: -1 | 1) => {
    const rail = processRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * .72, behavior: "smooth" });
  };

  const loopReviews = () => {
    const rail = reviewRailRef.current;
    if (!rail) return;
    const segment = rail.scrollWidth / 3;
    if (rail.scrollLeft < segment * .25) rail.scrollLeft += segment;
    else if (rail.scrollLeft > segment * 1.75) rail.scrollLeft -= segment;
  };

  useEffect(() => {
    const rail = reviewRailRef.current;
    if (!rail) return;
    const placeInMiddle = () => { rail.scrollLeft = rail.scrollWidth / 3; };
    placeInMiddle();
    const resizeObserver = new ResizeObserver(placeInMiddle);
    resizeObserver.observe(rail);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    updateProcessProgress();
    window.addEventListener("resize", updateProcessProgress);
    return () => window.removeEventListener("resize", updateProcessProgress);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = fullVideoRef.current;
    if (!hero || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastTime = -1;

    const syncVideoToScroll = () => {
      frame = 0;

      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      if (reducedMotion) {
        const stillFrame = Math.min(3.2, video.duration - 0.05);
        video.currentTime = stillFrame;
        setVanIsArriving(true);
        return;
      }

      const scrollRange = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / scrollRange));
      const rawTime = progress * Math.max(0, video.duration - 0.05);
      const nextTime = Math.round(rawTime * 24) / 24;

      if (nextTime !== lastTime) {
        video.currentTime = nextTime;
        lastTime = nextTime;
      }
      setVanIsArriving(nextTime >= 3);
    };

    const requestSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncVideoToScroll);
    };

    video.pause();
    video.addEventListener("loadedmetadata", syncVideoToScroll);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    syncVideoToScroll();

    return () => {
      video.removeEventListener("loadedmetadata", syncVideoToScroll);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const finalVideo = finalVideoRef.current;
    if (!hero || !finalVideo) return;
    if (hero.classList.contains("hero-fullbleed-layout")) return;

    finalVideo.defaultPlaybackRate = 1.5;
    finalVideo.playbackRate = 1.5;

    let switchTimer = 0;
    let flashTimer = 0;
    let autoTimer = 0;

    const triggerReveal = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      window.clearTimeout(autoTimer);
      const isFullbleed = hero.classList.contains("hero-fullbleed-layout");
      if (!isFullbleed) hero.classList.add("flash-is-active");

      if (finalVideo.ended || finalVideo.currentTime > 0.25) finalVideo.currentTime = 0;
      finalVideo.playbackRate = 1.5;
      finalVideo.play().catch(() => undefined);

      switchTimer = window.setTimeout(() => {
        hero.classList.add("final-is-active");
      }, 240);

      if (!isFullbleed) {
        flashTimer = window.setTimeout(() => {
          hero.classList.remove("flash-is-active");
        }, 950);
      }
    };

    // Auto-reveal on a crisp cinematic beat (1.2s)
    autoTimer = window.setTimeout(triggerReveal, 1200);

    // If user interacts / scrolls early, trigger immediately
    const onEarlyAction = () => {
      if (!hasStartedRef.current) {
        triggerReveal();
      }
    };

    window.addEventListener("scroll", onEarlyAction, { passive: true, once: true });
    window.addEventListener("touchstart", onEarlyAction, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", onEarlyAction);
      window.removeEventListener("touchstart", onEarlyAction);
      window.clearTimeout(autoTimer);
      window.clearTimeout(switchTimer);
      window.clearTimeout(flashTimer);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = document.querySelectorAll<HTMLElement>(
      ".site-shell > section:not(.hero):not(.intro-section) > *:not(.closing-background):not(.closing-shade), .site-shell > aside > *, .service-card, .process-row, .plan-cards article, .mosaic-card, .review-image-card, .review-copy-card, .turnkey-mark-reveal, .site-footer > *",
    );
    const introSection = document.querySelector<HTMLElement>(".intro-section");

    revealTargets.forEach((element) => element.classList.add("scroll-reveal"));

    if (reducedMotion) {
      revealTargets.forEach((element) => element.classList.add("is-revealed"));
      introSection?.classList.add("intro-visible");
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    revealTargets.forEach((element) => observer.observe(element));

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          introSection?.classList.add("intro-visible");
          introObserver.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    if (introSection) introObserver.observe(introSection);

    return () => {
      observer.disconnect();
      introObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <main className={`site-shell ${manropeExtraBold.variable}`}>
      <header className={`site-header${solidHero ? " panel-active" : ""}${isScrolled ? " is-scrolled" : ""}`}>
        <Link className="brand" href="/" aria-label="Total Power Generators home">
          <span className="header-logo-lockup">
            <Image className="brand-logo" src="/logo.svg" alt="Total Power Generators" width={689} height={240} priority />
            <Image className="brand-logo brand-logo-color" src="/logo.svg" alt="" width={689} height={240} aria-hidden="true" priority />
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/generators">Generators</Link><Link href="/installation">Installation</Link>
          <Link href="/maintenance">Maintenance</Link><Link href="/financing">Financing</Link>
          <Link href="/service-area">Service Area</Link><Link href="/about">About</Link><Link href="/builders">Builders</Link>
        </nav>
        <Link className="header-cta" href="/quote">Get a Free Quote <Arrow /></Link>
        <MobileNav />
      </header>
      <section className={`hero${solidHero ? " hero-solid-layout" : ""}${heroVariant === "centered" ? " hero-centered-layout" : ""}${heroVariant === "fullbleed" ? " hero-fullbleed-layout" : ""}${heroVariant === "fullbleed" && vanIsArriving ? " van-is-arriving" : ""}`} ref={heroRef}>
        <div className="hero-stage">
          <div className="video-background" aria-hidden="true">
            <video className="background-video loop-video" autoPlay loop muted playsInline preload="auto" poster="/hero-final.webp" width="1920" height="1080">
              <source src="/loop.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
            </video>
            <video ref={finalVideoRef} className="background-video final-video" autoPlay loop muted playsInline preload="auto" poster="/hero-final.webp" width="1920" height="1080">
              <source src="/final.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
            </video>
            <video ref={fullVideoRef} className="background-video full-video" autoPlay loop muted playsInline preload="auto" poster="/hero-final.webp" width="1920" height="1080">
              <source src="/full-scroll.mp4" type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
            </video>
            <div className="video-shade" />
            <div className="lightning-flash" aria-hidden="true" />
          </div>
          <div className="hero-style-toggle" aria-label="Choose hero layout">
            <button className={heroVariant === "cinematic" ? "active" : ""} onClick={() => setHeroVariant("cinematic")} type="button">Cinematic</button>
            <button className={heroVariant === "panel" ? "active" : ""} onClick={() => setHeroVariant("panel")} type="button">Panel</button>
            <button className={heroVariant === "centered" ? "active" : ""} onClick={() => setHeroVariant("centered")} type="button">Centered</button>
            <button className={heroVariant === "fullbleed" ? "active" : ""} onClick={() => setHeroVariant("fullbleed")} type="button">Full bleed</button>
          </div>
          <section className="hero-content" aria-labelledby="hero-title">
            <div className="eyebrow">South Florida&apos;s standby power experts</div>
            <h1 id="hero-title">
              <span className="hero-title-line"><RevealWords text="Storms don’t" /></span>
              <span className="hero-title-line"><RevealWords text="schedule." offset={3} /></span>
              <span className="accent">We do.</span>
            </h1>
            <p className="hero-subtitle">
              <RevealWords text="Home standby generators," offset={4} />
              <br />
              <RevealWords text="installed before you need one." offset={7} />
            </p>
            <div className="action-row" id="quote">
              <Link className="primary-cta" href="/quote">Get a Free Quote <Arrow /></Link>
              <a className="phone-link" href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <Image className="avatar-img" src="/avatars/homeowner-1.png" alt="South Florida homeowner" width={53} height={53} />
                <Image className="avatar-img" src="/avatars/homeowner-2.png" alt="South Florida homeowner" width={53} height={53} />
                <Image className="avatar-img" src="/avatars/homeowner-3.png" alt="South Florida homeowner" width={53} height={53} />
              </div>
              <p>Trusted by 1,000+<br />South Florida homeowners</p>
            </div>
          </section>

          <div className="hero-scroll-cue" aria-hidden="true">
            <span>Scroll down to continue</span>
            <svg viewBox="0 0 16 28"><path d="M8 1v24M2 19l6 7 6-7" /></svg>
          </div>

          <aside className="hero-footer" aria-label="Company credentials">
            <div className="hero-stat">
              <strong>2009</strong><span>Serving South Florida</span>
            </div>
            <div className="hero-stat">
              <strong>Gas + Electric</strong><span>Licensed gas and electrical contractor</span>
            </div>
            <div className="hero-stat">
              <strong>Elite+</strong><span>Generac PowerPro Elite Plus Dealer</span>
            </div>
            <div className="hero-stat">
              <strong>1000s</strong><span>Thousands of homes powered</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="intro-section" id="generators">
        <div className="section-kicker">The promise</div>
        <span className="intro-logomark" aria-hidden="true" />
        <div className="intro-copy">
          <h2><RevealWords text="Power out?" /><br /><span className="intro-accent"><RevealWords text="Not here." accentLastPunctuation /></span></h2>
          <p><RevealWords text="A standby generator starts on its own the moment the power drops. The A/C keeps running, the fridge stays cold and the Wi-Fi stays on, whether you’re home or halfway around the world." /></p>
          <Link className="text-link intro-link" href="/generators">How standby generators work <Arrow /></Link>
        </div>
      </section>

      <section className="services-section" id="installation">
        <div className="section-heading light-heading">
          <div className="section-kicker">Turnkey</div>
          <h2>Gas. Electrical.<br /><span>Permits. One crew.</span></h2>
          <p>Most generator jobs get passed between a dealer, an electrician, a gas contractor and the permit office. Ours never leave our hands. One schedule, one point of contact, one company responsible.</p>
        </div>
        <div className="turnkey-system">
          <div className="turnkey-system-visual turnkey-mark-reveal" role="img" aria-label="Total Power installation team and generator service"><Image src={installationImage} alt="" fill sizes="(max-width: 900px) 82vw, 46vw" /></div>

          <div className="turnkey-capabilities">
            {[
              ["pad", "Site preparation and the generator pad", "Site leveling, ground compaction and a hurricane-rated pad anchored to Florida code."],
              ["placement", "Placing and setting the generator", "Precision delivery and placement with the required clearances and property setbacks."],
              ["gas", "Natural gas connection or propane", "Licensed in-house gas plumbing, meter tie-in or complete propane tank and fuel-line installation."],
              ["switch", "Automatic transfer switch", "Whole-home or essential-circuit integration that restores power automatically in seconds."],
              ["electrical", "All electrical connections", "Code-compliant panel wiring, surge protection and load-management configuration."],
              ["permits", "Permits, inspections and walkthrough", "Municipal permitting, inspections, warranty registration and a complete startup walkthrough."],
            ].map(([icon, title, copy]) => (
              <article className="turnkey-capability" key={title}>
                <div className="turnkey-capability-icon"><FeatureIcon name={icon} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <Link className="section-cta" href="/installation">See how installation works <Arrow /></Link>
      </section>

      <section className="process-section" id="process">
        <div className="process-intro">
          <div className="section-kicker">The process</div>
          <h2>Five steps.<br /><span>Zero runaround.</span></h2>
        </div>
        <div className="process-slider-shell">
          <div className="process-list" ref={processRailRef} onScroll={updateProcessProgress}>
            {[
              ["01", "Free in-home assessment.", "We size the generator to your home and how you live."],
              ["02", "A clear quote.", "One price, with financing available if you want it."],
              ["03", "Permits, handled.", "We file and follow up."],
              ["04", "Install day.", "Our crew places the unit, runs the gas and makes the connections."],
              ["05", "Walkthrough.", "We test it with you and show you exactly what happens when the power drops."],
            ].map(([number, title, copy]) => (
              <article className="process-row" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><Arrow /></article>
            ))}
          </div>
          <div className="process-slider-controls">
            <div className="process-progress" role="progressbar" aria-label="Process slider progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(processProgress * 100)}><span style={{ transform: `scaleX(${processProgress})` }} /></div>
            <div><button type="button" onClick={() => moveProcess(-1)} aria-label="Previous process steps"><ChevronLeft /></button><button type="button" onClick={() => moveProcess(1)} aria-label="Next process steps"><ChevronRight /></button></div>
          </div>
          <div className="dual-actions"><Link className="dark-button" href="/quote">Get a Free Quote <Arrow /></Link><a className="phone-link dark-phone" href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div>
        </div>
      </section>

      <section className="plans-section">
        <div className="plans-copy">
          <div className="section-kicker">Maintenance</div>
          <h2>Installed once.<br /><span>Ready every time.</span></h2>
          <p>Scheduled service, written response times and local technicians who already know your system.</p>
          <div className="plans-proof"><span><b>24/7</b> monitoring available</span><span><b>8 hr</b> fastest response</span></div>
          <Link className="primary-cta" href="/maintenance">Choose Your Plan <Arrow /></Link>
        </div>
        <div className="plans-visual" aria-hidden="true">
          <Image src="/generator-detail.png" alt="" fill sizes="100vw" />
          <div className="plans-visual-shade" />
        </div>
        <div className="plan-cards">
          {[
            { name: "Total Essentials", label: "Annual check-up", price: "$350/yr", monthly: "$31/mo", response: "24-hour response", feature: "1 scheduled visit", features: ["Annual system inspection", "Battery and fluid check", "Transfer-switch test", "24-hour response"], Icon: Wrench },
            { name: "Total Care", label: "Year-round confidence", price: "$625/yr", monthly: "$54/mo", response: "12-hour response", feature: "2 scheduled visits", features: ["Two scheduled visits", "Everything in Essentials", "Priority scheduling", "12-hour response"], Icon: Clock3 },
            { name: "Total Protect", label: "Complete protection", price: "$1,050/yr", monthly: "$91/mo", response: "8-hour response", feature: "Monitoring included", features: ["Two scheduled visits", "Remote monitoring included", "Priority technical support", "8-hour response"], Icon: ShieldCheck, featured: true },
          ].map(({ name, label, price, monthly, response, feature, features, Icon, featured }, index) => (
            <article className={featured ? "featured-plan" : ""} key={name}>
              <span className="plan-number">0{index + 1}</span>
              {featured && <span className="plan-recommended">Most complete</span>}
              <Icon className="plan-icon" aria-hidden="true" />
              <div className="plan-card-copy"><span>{label}</span><h3>{name}</h3><div><small>Starting at</small><b>{price}</b><small>or from {monthly}<br />{response} · {feature}</small></div></div>
              <Link href={`/quote?need=Maintenance&plan=${encodeURIComponent(`${name} · Up to 28kW · Annual`)}`} aria-label={`View ${name}`}>View plan <Arrow /></Link>
              <div className="plan-features"><span>What&apos;s included</span><ul>{features.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <Link className="plan-restrictions" href="/terms">Restrictions apply</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="crew-mosaic-section" aria-label="The crew, monitoring, and financing">
        <div className="feature-suite-header">
          <div className="section-kicker">Why Total Power</div>
          <h2>One team. Complete<br /><span>power confidence.</span></h2>
          <p>From the people who install your system to the tools that keep it ready, everything works together under one roof.</p>
        </div>

        <div className="feature-suite-grid">
          <article className="mosaic-card feature-suite-card feature-suite-crew" id="about">
            <div className="feature-suite-visual">
              <Image src={reviewImage} alt="A Total Power specialist meeting with South Florida homeowners" fill sizes="(max-width: 900px) 100vw, 34vw" />
              <div className="feature-suite-image-shade" />
              <span className="feature-suite-badge">10–15 years together</span>
            </div>
            <div className="feature-suite-copy">
              <span className="feature-suite-number">The crew</span>
              <h3>One crew.<br />Start to finish.</h3>
              <p>Our licensed gas and electrical team handles the entire installation, with one company accountable from quote to walkthrough.</p>
              <Link href="/about">Meet the crew <Arrow /></Link>
            </div>
          </article>

          <article className="mosaic-card feature-suite-card feature-suite-connected">
            <div className="feature-suite-visual">
              <Image className="feature-suite-phone-image" src="/pics/phone.png" alt="A homeowner checking their generator status on a phone" fill sizes="(max-width: 900px) 100vw, 34vw" />
            </div>
            <div className="feature-suite-copy">
              <span className="feature-suite-number">Stay connected</span>
              <h3>Your generator.<br />In your pocket.</h3>
              <p>Check its status anytime. With monitoring, our team sees alerts too and can reach out before you need to call.</p>
              <Link href="/maintenance">See monitoring plans <Arrow /></Link>
            </div>
          </article>

          <article className="mosaic-card feature-suite-card feature-suite-finance" id="financing">
            <div className="feature-suite-visual">
              <div className="finance-preview">
                <span>Flexible financing</span>
                <strong>Power now.<br />Pay monthly.</strong>
                <div><small>Simple application</small><b>Minutes, not days</b></div>
                <div><small>Payment options</small><b>Built for your budget</b></div>
              </div>
            </div>
            <div className="feature-suite-copy">
              <span className="feature-suite-number">Financing</span>
              <h3>A better way<br />to get ready.</h3>
              <p>Turn a one-time investment into a monthly payment that fits your plans. Checking your options only takes a few minutes.</p>
              <Link href="/financing">See your monthly payment <Arrow /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="home-reviews">
        <div className="review-intro-band">
          <span className="review-intro-label">Testimonials</span>
          <p>We’ve helped thousands of South Florida homeowners stay ready. Their trust and referrals are our reward.</p>
        </div>
        <div className="home-review-showcase">
          <div className="home-review-aside">
            <Image className="home-review-person" src="/pics/guy.png" width={1198} height={1313} alt="Total Power technician" />
            <div className="home-review-aside-copy"><strong className="home-review-score">4.9</strong><h2>Trusted by South Florida homeowners—and recommended neighbor to neighbor.</h2><div className="home-review-arrows"><button type="button" aria-label="Previous testimonial" onClick={() => moveReviews(-1)}><ChevronLeft /></button><button type="button" aria-label="Next testimonial" onClick={() => moveReviews(1)}><ChevronRight /></button></div></div>
          </div>
          <div className="home-review-rail" ref={reviewRailRef} onScroll={loopReviews}>
            {[...testimonials, ...testimonials, ...testimonials].map(([quote, person], index) => <article key={`${person}-${index}`}><div><strong>{[4.8, 4.9, 4.9, 5.0][index % 4].toFixed(1)}</strong><span aria-label="Five stars">★★★★★</span></div><blockquote>{quote}</blockquote><footer><Image src={`/avatars/avatar-${index % 3 + 1}.jpg`} alt="" width={52} height={52} /><p><b>{person}</b></p></footer></article>)}
          </div>
        </div>
      </section>

      <div className="closing-band"><section className="closing-section">
        <Image className="closing-background" src={ctaSectionImage} alt="A Total Power technician arriving at a South Florida home before a storm" fill sizes="100vw" />
        <div className="closing-shade" />
        <div className="closing-content">
          <span className="closing-rule" aria-hidden="true" />
          <h2>Call us on a<br />sunny day.</h2>
          <h3 className="closing-response">Thank yourself<br />in a storm.</h3>
          <p>Permits and installs take time, and schedules fill fast once a storm is on the map. Book your assessment while the sky is clear.</p>
          <div className="dual-actions light-actions"><Link className="primary-cta" href="/quote">Get a Free Quote <Arrow /></Link><a className="phone-link" href="tel:+13054719010">Or call (305) 471-9010 <Arrow /></a></div>
        </div>
      </section><div className="closing-person" aria-hidden="true"><Image src="/pics/cta.png" alt="" width={575} height={977} /></div></div>

      <footer className="site-footer">
        <div className="footer-lead">
          <Link className="brand footer-brand" href="/" aria-label="Total Power Generators home"><Image className="brand-logo" src="/logo.svg" alt="Total Power Generators" width={689} height={240} /></Link>
          <p>Total Power &amp; Gas Contractors. Home generators, installed and maintained by one local crew since 2009.</p>
        </div>
        <div className="footer-column"><b>Explore</b><Link href="/generators">Generators</Link><Link href="/installation">Installation</Link><Link href="/maintenance">Maintenance</Link><Link href="/financing">Financing</Link><Link href="/service-area">Service Area</Link><Link href="/about">About</Link><Link href="/builders">Builders</Link><Link href="/faq">FAQ</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
        <div className="footer-column"><b>Contact</b><a href="tel:+13054719010">(305) 471-9010</a><a href="mailto:contact@totalpowergenerators.com">contact@totalpowergenerators.com</a><span>4794 SW 75th Ave<br />Miami, FL 33155</span><Link href="/service-repair">Service &amp; Repair</Link></div>
        <small>Generac PowerPro Elite Plus Dealer · © 2026 Total Power &amp; Gas Contractors</small>
      </footer>
    </main>
  );
}
