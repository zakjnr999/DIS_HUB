import Image from "next/image";
import { QuoteIcon } from "@/components/icons";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#F7EFE3]">
      <div className="container-shell">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[#7A5636]">
            Customer notes
          </p>
          <h2 className="font-heading mt-3 text-4xl font-bold text-[#1F1B18] md:text-5xl">
            Quiet confidence from real service moments.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              className="rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/78 p-5 shadow-[0_18px_48px_rgba(59,36,22,0.07)]"
              key={testimonial.name}
            >
              <div className="flex items-center justify-between gap-4">
                <Image
                  alt={testimonial.imageAlt}
                  className="h-14 w-14 rounded-full object-cover shadow-sm"
                  height={56}
                  src={testimonial.image}
                  width={56}
                />
                <QuoteIcon className="h-9 w-9 text-[#C8A96A]" />
              </div>
              <p className="mt-4 text-sm leading-7 text-[#7B6F65]">
                {testimonial.review}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-bold text-[#1F1B18]">{testimonial.name}</p>
                <p aria-label={`${testimonial.rating} star rating`} className="text-[#C8A96A]">
                  {"★".repeat(testimonial.rating)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
