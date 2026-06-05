import { SectionHeader } from "@/components/common/SectionHeader";
import { ServiceCard } from "@/components/home/ServiceCard";
import { images } from "@/config/images";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#FBF6ED]" id="services">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `url(${images.backgroundPattern})` }}
      />
      <div className="container-shell relative">
        <SectionHeader
          description="Choose from practical clothing care, custom sewing, and presentation-ready fashion support services."
          eyebrow="Our services"
          title="Everything your outfit needs, from idea to final press."
        />
        <div className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
