import Image from "next/image";
import { Badge } from "@/components/common/Badge";
import { FabricConsultationIcon, IroningIcon, UniformIcon } from "@/components/icons";
import { images } from "@/config/images";

export function AboutSection() {
  return (
    <section className="section-padding bg-[#FFFDF8]" id="about">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem]">
          <Image
            alt={images.about.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={images.about.src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B2416]/48 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] bg-[#FFFDF8]/90 p-4 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <FabricConsultationIcon className="h-10 w-10 shrink-0 text-[#C8A96A]" />
              <div>
                <p className="text-sm font-bold text-[#1F1B18]">
                  Fabric-first guidance
                </p>
                <div className="mt-2 flex gap-2 text-[#7A5636]">
                  <UniformIcon className="h-6 w-6" />
                  <IroningIcon className="h-6 w-6 text-[#9A4A3C]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Badge>About the studio</Badge>
          <h2 className="font-heading mt-5 text-4xl font-bold leading-tight text-[#1F1B18] md:text-6xl">
            Clothing care made simple, polished, and reliable.
          </h2>
          <div className="stitch-line mt-6 w-32" />
          <p className="mt-6 text-base leading-8 text-[#7B6F65]">
            Adi3ye Services provides professional clothing care, alteration,
            sewing, and fashion support services. We help customers get quality
            finishing, proper fitting, and convenient service booking. Whether
            you need a dress adjusted, a new outfit made, clothing repaired, or
            professional ironing, Adi3ye Services makes the process simple and
            reliable.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {["Neat finishing", "Proper fitting", "Simple booking"].map((item) => (
              <span
                className="rounded-full border border-[#E8D8C3] bg-[#F7EFE3] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.08em] text-[#7A5636]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
