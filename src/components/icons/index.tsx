import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  );
}

const stroke = {
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 3,
};

export function PillIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect {...stroke} height="34" rx="13" transform="rotate(35 32 32)" width="22" x="21" y="15" />
      <path {...stroke} d="M22 39 42 25" />
    </IconBase>
  );
}

export function CondomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M25 16h14M25 16c0 8-5 12-5 23 0 9 5 14 12 14s12-5 12-14c0-11-5-15-5-23" />
      <path {...stroke} d="M25 22h14M26 44c4 3 8 3 12 0" />
    </IconBase>
  );
}

export function TestKitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect {...stroke} height="42" rx="11" width="24" x="20" y="11" />
      <rect {...stroke} height="15" rx="4" width="12" x="26" y="23" />
      <path {...stroke} d="M28 29h8M28 33h8M32 44h.01" />
    </IconBase>
  );
}

export function PackageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M14 22 32 12l18 10v20L32 52 14 42V22Z" />
      <path {...stroke} d="m14 22 18 10 18-10M32 32v20M23 17l18 10" />
    </IconBase>
  );
}

export function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M12 38h28V23H12zM40 30h8l5 8v8H40z" />
      <circle {...stroke} cx="21" cy="47" r="5" />
      <circle {...stroke} cx="47" cy="47" r="5" />
      <path {...stroke} d="M18 29h13M16 34h9" />
    </IconBase>
  );
}

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M15 16h5l5 27h22l5-18H24" />
      <circle {...stroke} cx="29" cy="50" r="4" />
      <circle {...stroke} cx="45" cy="50" r="4" />
    </IconBase>
  );
}

export function CheckoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M17 13h30v38H17zM24 23h16M24 32h16M24 41h8" />
      <path {...stroke} d="m40 41 4 4 8-10" />
    </IconBase>
  );
}

export function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M14 34c0-12 8-21 18-21s18 9 18 21" />
      <path {...stroke} d="M18 34h8v13h-8zM38 34h8v13h-8zM38 50c-2 3-5 4-10 4h-4" />
    </IconBase>
  );
}

export function PrivacyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M32 9 15 16v13c0 13 7 22 17 26 10-4 17-13 17-26V16L32 9Z" />
      <path {...stroke} d="M24 32h16M28 32v-5a4 4 0 0 1 8 0v5M27 32v11h10V32" />
    </IconBase>
  );
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle {...stroke} cx="32" cy="32" r="23" />
      <path {...stroke} d="M32 29v14M32 21h.01" />
    </IconBase>
  );
}

export function ConfirmationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle {...stroke} cx="32" cy="32" r="23" />
      <path {...stroke} d="m21 33 8 8 15-18" />
    </IconBase>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle {...stroke} cx="29" cy="29" r="15" />
      <path {...stroke} d="m40 40 11 11" />
    </IconBase>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M32 51S13 40 13 25c0-7 5-12 12-12 4 0 7 2 7 5 0-3 3-5 7-5 7 0 12 5 12 12 0 15-19 26-19 26Z" />
    </IconBase>
  );
}

export function AdminIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle {...stroke} cx="32" cy="22" r="8" />
      <path {...stroke} d="M16 50c0-10 8-16 16-16s16 6 16 16" />
      <rect {...stroke} height="12" rx="2" width="10" x="42" y="38" />
      <path {...stroke} d="M47 38v-3a2 2 0 0 0-4 0v3" />
    </IconBase>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M12 20h40M12 32h40M12 44h40" />
    </IconBase>
  );
}

