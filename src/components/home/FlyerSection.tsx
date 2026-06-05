import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DressSewingIcon } from "@/components/icons";
import { images } from "@/config/images";

export function FlyerSection() {
  return (
    <section className="section-padding bg-[#F7EFE3]">
      <div className="container-shell">
        <div className="grid items-center gap-8 md:grid-cols-[0.82fr_1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem]">
            <Image
              alt={images.flyer.alt}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 340px, 90vw"
              src={images.flyer.src}
            />
          </div>
          <div className="px-2 py-4 md:px-4">
            <Badge>Featured Service</Badge>
            <h2 className="font-heading mt-5 text-4xl font-bold leading-tight text-[#1F1B18] md:text-6xl">
              A polished flyer moment for your next outfit.
            </h2>
            <div className="stitch-line mt-6 w-32" />
            <p className="mt-6 max-w-xl text-base leading-8 text-[#7B6F65]">
              The flyer area is ready for campaigns, seasonal offers, bridal
              services, or a featured tailoring package while still feeling part
              of the Adi3ye Services brand.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/book">
                <DressSewingIcon className="h-5 w-5" />
                Book From Flyer
              </Button>
              <Button href="/#services" variant="secondary">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
