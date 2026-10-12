import React from "react";

interface IconProps {
  className?: string;
}

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "pad":
      return <PadIcon className={className} />;
    case "placement":
      return <PlacementIcon className={className} />;
    case "gas":
      return <GasIcon className={className} />;
    case "switch":
      return <TransferSwitchIcon className={className} />;
    case "electrical":
      return <ElectricalPanelIcon className={className} />;
    case "permits":
      return <PermitsIcon className={className} />;
    default:
      return <PadIcon className={className} />;
  }
}

// 1. Site Preparation & Generator Pad: 3D engineered foundation slab with anchoring
export function PadIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pad-stroke" x1="4" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="pad-fill" x1="24" y1="12" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Ground leveling grid lines */}
      <path d="M6 38H42" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 3" strokeOpacity="0.4" />
      <path d="M12 42H36" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 3" strokeOpacity="0.25" />

      {/* 3D Engineered Slab Top Face */}
      <polygon
        points="24,11 42,20 24,29 6,20"
        stroke="url(#pad-stroke)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="url(#pad-fill)"
      />

      {/* 3D Slab Thickness / Side Facets */}
      <path
        d="M6 20V27L24 36V29M42 20V27L24 36"
        stroke="url(#pad-stroke)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#38bdf8"
        fillOpacity="0.08"
      />

      {/* Corner Leveling & Anchor Points */}
      <circle cx="24" cy="20" r="2" fill="#67e8f9" />
      <circle cx="15" cy="24.5" r="1.5" fill="#38bdf8" />
      <circle cx="33" cy="24.5" r="1.5" fill="#38bdf8" />
      <path d="M24 6V11" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 2. Placing & Setting the Generator: Precision placement brackets and generator enclosure
export function PlacementIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="place-stroke" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="place-fill" x1="12" y1="14" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Precision Placement Corner Brackets */}
      <path d="M6 14V8H12" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 14V8H36" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 34V40H12" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 34V40H36" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* Generator Cabinet Enclosure */}
      <rect
        x="11"
        y="14"
        width="26"
        height="20"
        rx="3"
        stroke="url(#place-stroke)"
        strokeWidth="1.8"
        fill="url(#place-fill)"
      />

      {/* Roof Chamfer / Hood */}
      <path d="M11 19H37" stroke="url(#place-stroke)" strokeWidth="1.4" />

      {/* Ventilation Louvers */}
      <path d="M16 24H24M16 27H24M16 30H24" stroke="#67e8f9" strokeWidth="1.4" strokeLinecap="round" />

      {/* Status Beacon / Lock Indicator */}
      <circle cx="31" cy="25" r="2.2" stroke="#38bdf8" strokeWidth="1.4" fill="#67e8f9" fillOpacity="0.3" />
      <path d="M31 29H33" stroke="#67e8f9" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 3. Natural Gas Connection or Propane: Gas pipeline valve and luminous fuel flame
export function GasIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gas-stroke" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="flame-fill" x1="24" y1="8" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Fuel Pipe Base & Flange */}
      <path d="M8 39H40" stroke="url(#gas-stroke)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 39V43M31 39V43" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="20" y="34" width="8" height="5" rx="1.5" stroke="#67e8f9" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.15" />

      {/* Main Outer Flame Contour */}
      <path
        d="M24 7C24 7 14 17 14 24.5C14 30 18.5 34.5 24 34.5C29.5 34.5 34 30 34 24.5C34 17 24 7 24 7Z"
        stroke="url(#gas-stroke)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="url(#flame-fill)"
      />

      {/* Inner Glowing Flame Core */}
      <path
        d="M24 16C24 16 19 21.5 19 25.5C19 28.3 21.2 30.5 24 30.5C26.8 30.5 29 28.3 29 25.5C29 21.5 24 16 24 16Z"
        stroke="#67e8f9"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#67e8f9"
        fillOpacity="0.25"
      />
    </svg>
  );
}

// 4. Automatic Transfer Switch (ATS): High-speed power toggle with lightning transfer
export function TransferSwitchIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="switch-stroke" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="switch-fill" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Outer ATS Enclosure */}
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="4"
        stroke="url(#switch-stroke)"
        strokeWidth="1.8"
        fill="url(#switch-fill)"
      />

      {/* Utility Grid Line (Left Terminal) */}
      <circle cx="16" cy="18" r="2.2" stroke="#67e8f9" strokeWidth="1.4" fill="#67e8f9" fillOpacity="0.4" />
      <path d="M16 12V15.8" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />

      {/* Generator Line (Right Terminal) */}
      <circle cx="32" cy="18" r="2.2" stroke="#38bdf8" strokeWidth="1.4" fill="#38bdf8" fillOpacity="0.4" />
      <path d="M32 12V15.8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

      {/* High-speed Transfer Lightning Bolt */}
      <path
        d="M26 18L18 27H24L22 34L31 24H25L26 18Z"
        stroke="url(#switch-stroke)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="#67e8f9"
        fillOpacity="0.3"
      />

      {/* Output Feed (Bottom) */}
      <path d="M24 39V43" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 5. Electrical Connections to Panel: Breaker panel with slider switches (inspired by Image 2 sliders)
export function ElectricalPanelIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="panel-stroke" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      {/* Slider/Breaker Rail 1 */}
      <path d="M10 14H38" stroke="url(#panel-stroke)" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="18" y="10.5" width="12" height="7" rx="3.5" stroke="#67e8f9" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.25" />
      <circle cx="24" cy="14" r="1.5" fill="#67e8f9" />

      {/* Slider/Breaker Rail 2 */}
      <path d="M10 24H38" stroke="url(#panel-stroke)" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="26" y="20.5" width="12" height="7" rx="3.5" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.25" />
      <circle cx="32" cy="24" r="1.5" fill="#67e8f9" />

      {/* Slider/Breaker Rail 3 */}
      <path d="M10 34H38" stroke="url(#panel-stroke)" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="13" y="30.5" width="12" height="7" rx="3.5" stroke="#818cf8" strokeWidth="1.5" fill="#818cf8" fillOpacity="0.25" />
      <circle cx="19" cy="34" r="1.5" fill="#67e8f9" />
    </svg>
  );
}

// 6. Permits, Inspections & Walkthrough: Official certification shield with verified check
export function PermitsIcon({ className }: IconProps) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="permit-stroke" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="shield-fill" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Municipal Certification Shield */}
      <path
        d="M24 7L38 12.5V23C38 31.8 32 38.8 24 42C16 38.8 10 31.8 10 23V12.5L24 7Z"
        stroke="url(#permit-stroke)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="url(#shield-fill)"
      />

      {/* Inner Verification Checkmark */}
      <path
        d="M17 23.5L22 28.5L31 18.5"
        stroke="#67e8f9"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Seal / Inspection Stamp Accent */}
      <path d="M19 33.5C20.5 34.8 22.2 35.8 24 36.5C25.8 35.8 27.5 34.8 29 33.5" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}
