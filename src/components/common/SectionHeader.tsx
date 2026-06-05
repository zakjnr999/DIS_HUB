import { Badge } from "@/components/common/Badge";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#1F1B18] md:text-5xl">
        {title}
      </h2>
      <div className="stitch-line mx-auto mt-5 w-28" />
      <p className="mt-5 text-base leading-7 text-[#7B6F65]">{description}</p>
    </div>
  );
}
