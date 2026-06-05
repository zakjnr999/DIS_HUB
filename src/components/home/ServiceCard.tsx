import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { serviceIconMap } from "@/components/icons";
import type { Service } from "@/types/service";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIconMap[service.iconName];

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[#C8A96A] hover:shadow-[0_26px_70px_rgba(59,36,22,0.13)]">
      <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#F7EFE3]">
        <Image
          alt={service.imageAlt}
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          src={service.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B2416]/46 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-full bg-[#FFFDF8] text-[#9A743E] shadow-sm">
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-2xl font-bold leading-tight text-[#1F1B18]">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#7B6F65]">
          {service.description}
        </p>
        <p className="mt-4 rounded-full bg-[#F7EFE3] px-4 py-2 text-xs font-bold text-[#7A5636]">
          {service.turnaround}
        </p>
        <Button
          className="mt-5 w-full"
          href={`/book?service=${service.slug}`}
          variant="secondary"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
