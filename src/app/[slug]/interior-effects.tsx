"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function InteriorEffects() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-interior-header]");
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const parallaxTargets = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
      if (!reducedMotion) {
        parallaxTargets.forEach((target) => {
          const rect = target.parentElement?.getBoundingClientRect();
          if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height) - .5;
          target.style.transform = `scale(1.06) translate3d(0, ${progress * 28}px, 0)`;
        });
      }
    };

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }), { threshold: .12, rootMargin: "0px 0px -7%" });
      revealTargets.forEach((target) => observer.observe(target));
      const lenis = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true, wheelMultiplier: .9 });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => { observer.disconnect(); lenis.destroy(); window.removeEventListener("scroll", onScroll); };
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
