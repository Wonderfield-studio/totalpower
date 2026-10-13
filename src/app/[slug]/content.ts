export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export type Section = {
  kicker?: string;
  title: string;
  body?: string;
  items?: string[];
  features?: FeatureItem[];
  sideImage?: boolean;
  variant?: "dark" | "orange" | "image" | "plans" | "faq" | "featuresGrid";
};

export type PageContent = {
  eyebrow: string;
  title: string;
  intro?: string;
  cta?: string;
  sections: Section[];
};

export const pages: Record<string, PageContent> = {
  generators: {
    eyebrow: "Standby generators",
    title: "When the grid stops. Your home doesn’t.",
    intro: "A standby generator sized around your home, installed by one local gas and electrical team.",
    sections: [
      { kicker: "How standby generators work", title: "The power goes out. Yours kicks in.", body: "When the grid goes down, your standby generator automatically detects the outage and restores power to your home. No scrambling, no extension cords, no interruption to what matters.", items: ["Grid drops", "Generator starts", "Power returns"], variant: "dark" },
      { kicker: "Coverage", title: "Power the whole house, or just what matters.", items: ["Whole-home. Everything runs as normal, central A/C included.", "Essentials. The circuits you choose: the fridge, the lights, a zone of A/C, medical equipment."], body: "Not sure which? That’s what the assessment is for." },
      { kicker: "Fuel", title: "Natural gas or propane. We run both.", body: "On natural gas, we connect to your line and you never think about fuel again. No gas service? We install a propane tank sized for your home.", variant: "orange" },
      { kicker: "The brands", title: "The best names in standby power. The right one for your home.", body: "We install and service the most trusted brands in the industry, including Generac and Kohler, and recommend the one that fits your home, your fuel and your budget. As a Generac PowerPro Elite Plus Dealer with factory-trained technicians, you get equipment you can count on, installed by a local crew that answers to you.", variant: "image" },
    ],
  },
  installation: {
    eyebrow: "Turnkey installation",
    title: "One crew. Start to finish.",
    intro: "Gas, electrical and permits, all handled by one team.",
    sections: [
      { kicker: "Why it matters", title: "When one team owns every trade, everything fits.", body: "Our gas, electrical and install crews work together every day. Schedules line up, questions get answered fast, and one company is accountable for the whole job, so the crew that starts it is the crew that finishes it.", sideImage: true },
      {
        kicker: "What’s included",
        title: "Everything it takes. Nothing for you to arrange.",
        variant: "featuresGrid",
        features: [
          {
            icon: "pad",
            title: "Site preparation and the generator pad",
            description: "Site leveling, ground compaction, and an engineered concrete or hurricane-rated pad anchored to Florida code.",
          },
          {
            icon: "placement",
            title: "Placing and setting the generator",
            description: "Precision rigging, delivery, and placement with strict adherence to manufacturer clearances and property setbacks.",
          },
          {
            icon: "gas",
            title: "Natural gas connection, or propane tank and line",
            description: "Licensed in-house gas plumbing—direct tie-in to your natural gas meter or full propane tank installation and fuel line.",
          },
          {
            icon: "switch",
            title: "Automatic transfer switch",
            description: "Whole-home or essential circuit ATS integration that detects utility outages and restores power automatically in seconds.",
          },
          {
            icon: "electrical",
            title: "All electrical connections to your panel",
            description: "Dedicated sub-panel wiring, code-compliant breaker interlocks, whole-home surge protection, and load management configuration.",
          },
          {
            icon: "permits",
            title: "Permits, inspections and walkthrough",
            description: "Full municipal permitting, city inspections, official warranty registration, and a complete start-up walkthrough with you.",
          },
        ],
        items: [
          "Site preparation and the generator pad",
          "Placing and setting the generator",
          "Natural gas connection, or propane tank and line",
          "Automatic transfer switch",
          "All electrical connections to your panel",
          "Permits, inspections and walkthrough",
        ],
      },
      { kicker: "The process", title: "Five steps. Zero runaround.", variant: "dark", items: ["Free in-home assessment", "A clear quote", "Permits, handled", "Install day", "Test and walkthrough"] },
    ],
  },
  maintenance: {
    eyebrow: "Maintenance & monitoring",
    title: "Ready when it matters.",
    intro: "Maintenance from the team that knows your generator.", cta: "Choose Your Plan",
    sections: [
      { kicker: "Why maintain it", title: "It waits all year for one bad day.", body: "Batteries weaken, filters clog and parts wear, even when the unit sits unused. Regular service catches problems on a calm afternoon, not in the middle of an outage." },
      { kicker: "The plans", title: "Three plans. One goal: ready every time.", items: ["Total Essentials. Annual inspection and service, done right.", "Total Care. A step up in coverage and attention.", "Total Protect. Our most complete plan, with 24/7 remote monitoring included."], variant: "plans" },
      { kicker: "Monitoring", title: "You get the alert. We’re already on it.", body: "With your generator’s app, you’ll see alerts on your phone. With our monitoring program, Total Power sees them too, around the clock, and reaches out to schedule a fix, often before you’d notice anything was wrong.", variant: "orange" },
      { kicker: "Every owner", title: "Didn’t buy it from us? We’ll still keep it ready.", body: "Our factory-trained technicians service Generac and Kohler generators, no matter who installed them." },
    ],
  },
  "service-repair": {
    eyebrow: "Service & repair", title: "Something off? We’re on it.", cta: "Book a Service Visit",
    intro: "Tell us what’s happening and we’ll send a technician.",
    sections: [{ kicker: "Monitoring customer?", title: "We’ve likely already seen the alert.", body: "Our monitoring team watches around the clock and will reach out to schedule a fix. For immediate help, call our local team.", variant: "dark" }],
  },
  financing: {
    eyebrow: "Flexible financing", title: "Power now. Pay over time.",
    intro: "Synchrony financing turns your investment into a manageable monthly payment.", cta: "Apply with Synchrony",
    sections: [
      { kicker: "How it works", title: "Three steps. A few minutes.", items: ["Check your options. A short application through Synchrony.", "Pick your payment. Choose the term that fits your budget.", "We schedule your install. Financing and installation move together, so nothing waits."], variant: "dark" },
      { kicker: "Start here", title: "The most expensive generator is the one you didn’t have.", body: "Start with a free in-home assessment. We’ll size the right system before you choose how to pay." },
    ],
  },
  "service-area": {
    eyebrow: "Our service area", title: "Local crews. South Florida.",
    intro: "Serving Miami-Dade, Broward, Boca Raton and Boynton Beach.",
    sections: [
      { kicker: "Home territory", title: "Close enough to answer. Experienced enough to deliver.", body: "Our crews install and maintain standby power across South Florida, with one local team accountable from assessment through service.", items: ["Miami-Dade County", "Broward County", "Boca Raton", "Boynton Beach"], variant: "dark" },
      { kicker: "Not sure?", title: "Tell us where you live.", body: "We’ll confirm service in your neighborhood and schedule your free in-home assessment." },
    ],
  },
  about: {
    eyebrow: "About Total Power", title: "The crew is the company.",
    intro: "Since 2009, one local team has handled every part of the job.",
    sections: [
      { kicker: "Meet the crew", title: "Same faces, year after year.", body: "Our gas, electrical, installation and service specialists work side by side—one experienced local crew from the first visit onward.", variant: "image" },
      { kicker: "Credentials", title: "Licensed. Insured. Factory-trained.", items: ["Licensed gas and electrical contractor", "Generac PowerPro Elite Plus Dealer", "Factory-trained technicians"], variant: "dark" },
    ],
  },
  reviews: {
    eyebrow: "Customer reviews", title: "Don’t take our word for it.", intro: "What our customers say about working with us.",
    sections: [{ kicker: "Our reputation", title: "Our best advertising lives next door.", body: "Most of our business comes from referrals. Ask our team for recent references from homeowners near you.", variant: "dark" }],
  },
  builders: {
    eyebrow: "Builders & trade partners", title: "Built in. Ready to sell.", cta: "Talk to Our Builder Team",
    intro: "We plan, install and support standby power for South Florida builders.",
    sections: [
      { kicker: "Why it matters", title: "Backup power is a feature buyers notice.", body: "In South Florida, buyers ask about it. A standby generator built into the plan adds value to the listing and saves the new owner a project after move-in." },
      { kicker: "How we work", title: "On your schedule. To your spec.", items: ["Generator sizing and specs from your plans", "Coordination from rough-in to final", "Gas and electrical connections by our licensed crew", "Permits and inspections, handled", "Start-up, testing and warranty registration", "Maintenance and service after move-in"], variant: "dark" },
      { kicker: "Electricians", title: "Partner with us on the generator.", body: "We supply the unit, run the gas, handle the permits and back the install with factory-trained service." },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions", title: "Good questions. Straight answers.",
    sections: [{ kicker: "What homeowners ask", title: "Everything you need to know before we visit.", variant: "faq", items: [
      "Why do you visit before quoting?|Every home is different. We size the generator to your panel, gas service and how you live, so the price is right the first time.",
      "Is the assessment really free?|Yes. No cost and no obligation.", "Do you handle permits?|Yes. We file them, follow them and meet the inspector.",
      "Natural gas, propane or diesel?|Most homes run on natural gas or propane. If you have natural gas, we connect to it; if not, we install a propane tank. If your property calls for diesel, we’ll walk you through the options at your assessment.",
      "Can I finance it?|Yes, through Synchrony. Visit our Financing page for current options.", "How long does it take?|It depends mostly on permits in your city. You’ll get a timeline with your quote.",
      "Do you service generators you didn’t install?|Yes. We service Generac and Kohler generators, no matter who installed them.", "Do you serve my area?|We serve Miami-Dade and Broward, and we’re expanding into Boca Raton and Boynton Beach."
    ] }],
  },
  quote: {
    eyebrow: "Free in-home assessment", title: "Let’s start with a visit.", intro: "Tell us a little about your home and we’ll call to schedule your free in-home assessment.", cta: "Request My Free Quote", sections: []
  },
};
