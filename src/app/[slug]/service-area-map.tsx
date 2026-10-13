"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const locations = [
  { name: "Miami-Dade County", query: "25.7617,-80.1918", href: "/service-area/miami", detail: "Miami · Kendall · Homestead" },
  { name: "Broward County", query: "26.1224,-80.1373", href: "/service-area/fort-lauderdale", detail: "Fort Lauderdale · Hollywood" },
  { name: "Boynton Beach", query: "26.5253,-80.0664", href: "/service-area/boynton-beach", detail: "Boca Raton · Boynton Beach" },
];

export default function ServiceAreaMap() {
  const [active, setActive] = useState(0);
  const location = locations[active];
  const mapUrl = `https://maps.google.com/maps?q=${location.query}&ll=${location.query}&z=12&output=embed`;

  return (
    <section className={styles.serviceMapSection} aria-labelledby="service-map-title">
      <div className={styles.serviceMapIntro}>
        <span>Home territory</span>
        <h2 id="service-map-title">South Florida.<br /><em>Covered.</em></h2>
        <p>One local crew for installation, permits and service—from Miami-Dade through Palm Beach County.</p>
      </div>

      <div className={styles.serviceMapFrame}>
        <iframe
          key={location.query}
          src={mapUrl}
          title={`Google map of ${location.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className={styles.mapStatus}>
          <Image src="/logomark.svg" width={250} height={240} alt="" aria-hidden="true" />
          <div>
            <span>Currently viewing</span>
            <strong>{location.name}</strong>
          </div>
        </div>
      </div>

      <div className={styles.serviceLocations} aria-label="Choose a service area">
        {locations.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={index === active ? styles.activeLocation : undefined}
            onClick={() => setActive(index)}
            aria-pressed={index === active}
          >
            <span><strong>{item.name}</strong><small>{item.detail}</small></span>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>

      <Link className={styles.mapAreaLink} href={location.href}>Explore {location.name} <span aria-hidden="true">→</span></Link>
    </section>
  );
}
