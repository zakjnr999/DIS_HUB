import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductImage({
  alt,
  className,
  priority,
  src,
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  src: string;
}) {
  return (
    <div className={cn("relative bg-white", className)}>
      <Image
        alt={alt}
        className="object-contain p-4"
        fill
        priority={priority}
        sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 260px"
        src={src}
      />
    </div>
  );
}
