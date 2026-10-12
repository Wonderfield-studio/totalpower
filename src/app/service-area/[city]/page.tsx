import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../[slug]/page.module.css";

const cities: Record<string, string> = { miami: "Miami", "fort-lauderdale": "Fort Lauderdale", "boca-raton": "Boca Raton", "boynton-beach": "Boynton Beach" };

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const name = cities[city]; if (!name) notFound();
  return <main className={styles.page}><section className={styles.hero}><div className={styles.heroShade} /><div className={styles.heroCopy}><span>South Florida service area</span><h1>Home generators in {name}, installed by a local crew.</h1><p>From sizing and permits to installation and maintenance, one Total Power team handles the whole job.</p><div className={styles.actions}><Link href="/quote">Get a Free Quote</Link><a href="tel:+13054719010">Or call (305) 471-9010</a></div></div></section><section className={styles.section}><div className={styles.sectionIntro}><span>Local service</span><h2>Built for South Florida homes.</h2><p>Book a free in-home assessment and we’ll recommend the right generator for your home, fuel supply and budget.</p></div></section><section className={styles.closing}><span>Ready when you are</span><h2>Start with a free visit.</h2><Link href="/quote">Get a Free Quote</Link></section></main>;
}
