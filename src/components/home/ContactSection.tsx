import Image from "next/image";
import { Button } from "@/components/common/Button";
import { ChatIcon, SupportIcon } from "@/components/icons";
import { businessConfig } from "@/config/business";
import { images } from "@/config/images";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function ContactSection() {
  return (
    <section className="section-padding bg-[#FBF6ED]" id="contact">
      <div className="container-shell">
        <div className="grid items-center gap-8 md:grid-cols-[0.82fr_1fr_auto]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem] md:aspect-[5/4]">
            <Image
              alt={images.customerSupport.alt}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 28vw, 100vw"
              src={images.customerSupport.src}
            />
          </div>
          <div>
            <SupportIcon className="h-12 w-12 text-[#C8A96A]" />
            <h2 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#1F1B18]">
              Need help choosing a service?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7B6F65]">
              Customer service can help confirm fabric details, pickup needs,
              estimated pricing, and booking timing before you submit.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            <Button href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}>
              <ChatIcon className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button href={businessConfig.phoneHref} variant="secondary">
              Call
            </Button>
            <Button href={`mailto:${businessConfig.email}`} variant="secondary">
              Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
