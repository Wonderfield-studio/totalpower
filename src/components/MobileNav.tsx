import Link from "next/link";

export const siteNav = [
  ["Generators", "/generators"],
  ["Installation", "/installation"],
  ["Maintenance", "/maintenance"],
  ["Financing", "/financing"],
  ["Service Area", "/service-area"],
  ["About", "/about"],
  ["Builders", "/builders"],
] as const;

export default function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-label="Open navigation"><span aria-hidden="true" /></summary>
      <nav aria-label="Mobile navigation">
        {siteNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        <Link className="mobile-nav-cta" href="/quote">Get a Free Quote</Link>
      </nav>
    </details>
  );
}
