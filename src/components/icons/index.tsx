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

export function DressSewingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M26 10h12l4 9-5 5 7 27H20l7-27-5-5 4-9Z" />
      <path {...stroke} d="M27 24c4 3 8 3 12 0M47 14l7 7M51 11l-7 7M48 39c5 1 8 3 8 7 0 3-3 5-7 5" />
    </IconBase>
  );
}

export function AlterationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M28 12h8l5 10-5 4 6 26H22l6-26-5-4 5-10Z" />
      <path {...stroke} d="M14 18c11 10 27 10 38 0" />
      <path {...stroke} d="M18 22v5M25 26v4M32 27v5M39 26v4M46 22v5" />
    </IconBase>
  );
}

export function RepairIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M16 20h32v28H16zM24 27h16v13H24z" />
      <path {...stroke} d="M22 14l20 36M46 14 18 42M25 34h4M35 34h4" />
    </IconBase>
  );
}

export function EmbroideryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M17 44c11-20 19-20 30 0M22 39c4 6 16 6 20 0" />
      <circle cx="20" cy="22" r="3" fill="currentColor" />
      <circle cx="32" cy="18" r="3" fill="currentColor" />
      <circle cx="44" cy="22" r="3" fill="currentColor" />
      <path {...stroke} d="M19 30c8 5 18 5 26 0M32 21v10" />
    </IconBase>
  );
}

export function IroningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M13 43h38c-2-10-9-16-20-17H16l-3 17Z" />
      <path {...stroke} d="M21 26v-6h14c6 0 10 3 13 8M16 48h34M23 35h7" />
    </IconBase>
  );
}

export function BridalWearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M32 9c-7 7-9 18-14 43h28C41 27 39 16 32 9Z" />
      <path {...stroke} d="M24 28c5 4 11 4 16 0M47 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" />
    </IconBase>
  );
}

export function UniformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M19 20l9-6 4 6 4-6 9 6v30H19V20Z" />
      <path {...stroke} d="M28 14h8M32 21v29M16 14v38M12 18h8M12 28h6M12 38h8M12 48h6" />
    </IconBase>
  );
}

export function FabricConsultationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M15 18h24v29H15zM25 13h24v29H25zM32 31l5 5 10-12" />
    </IconBase>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M17 16h30v34H17zM24 10v10M40 10v10M17 26h30M25 34h4M35 34h4M25 42h4" />
    </IconBase>
  );
}

export function ConfirmationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M18 33l9 9 19-22" />
      <path {...stroke} d="M32 56c13 0 24-11 24-24S45 8 32 8 8 19 8 32s11 24 24 24Z" />
    </IconBase>
  );
}

export function PickupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M22 22h20l4 30H18l4-30ZM26 22c0-6 3-10 6-10s6 4 6 10M15 41h34" />
    </IconBase>
  );
}

export function DeliveryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M13 38h27V22H13zM40 29h8l5 9v8H40zM20 49a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM47 49a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </IconBase>
  );
}

export function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M14 33c0-11 8-20 18-20s18 9 18 20M18 34h8v14h-8zM38 34h8v14h-8zM38 50c-2 3-5 4-9 4h-4M24 22c5-5 12-5 17 0" />
    </IconBase>
  );
}

export function BookingStatusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M17 14h30v36H17zM25 24h14M25 33h14M25 42h7M43 39l4 4 7-9" />
    </IconBase>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M12 30c0-10 9-18 20-18s20 8 20 18-9 18-20 18c-3 0-6 0-8-1l-10 5 3-10c-3-3-5-7-5-12Z" />
      <path {...stroke} d="M24 29h16M24 36h10" />
    </IconBase>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M32 56c13 0 24-11 24-24S45 8 32 8 8 19 8 32s11 24 24 24Z" />
      <path {...stroke} d="M32 18v15l10 6" />
    </IconBase>
  );
}

export function QuestionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M24 24c1-6 5-9 11-8 5 1 8 5 7 10-1 4-4 6-8 9-2 1-2 3-2 6" />
      <path {...stroke} d="M32 50h.01" />
    </IconBase>
  );
}

export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path {...stroke} d="M18 34h12v14H18V35c0-9 4-15 12-18M38 34h12v14H38V35c0-9 4-15 12-18" />
    </IconBase>
  );
}

export const serviceIconMap = {
  dress: DressSewingIcon,
  alteration: AlterationIcon,
  repair: RepairIcon,
  embroidery: EmbroideryIcon,
  ironing: IroningIcon,
  bridal: BridalWearIcon,
  uniform: UniformIcon,
  fabric: FabricConsultationIcon,
};
