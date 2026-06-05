import { QuestionIcon } from "@/components/icons";
import { SectionHeader } from "@/components/common/SectionHeader";
import { faqs } from "@/data/faqs";

export function FAQSection() {
  return (
    <section className="section-padding bg-[#FFFDF8]" id="faq">
      <div className="container-shell">
        <SectionHeader
          description="Answers to the most common questions customers ask before confirming a clothing service."
          eyebrow="FAQ"
          title="Helpful details before you book."
        />
        <div className="mx-auto grid max-w-4xl gap-4">
          {faqs.map((faq) => (
            <details
              className="group rounded-[2rem] border border-[#E8D8C3] bg-[#FBF6ED]/70 p-5 shadow-sm transition open:bg-[#FFFDF8]"
              key={faq.question}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 font-bold text-[#1F1B18]">
                <QuestionIcon className="h-8 w-8 shrink-0 text-[#C8A96A]" />
                {faq.question}
              </summary>
              <p className="ml-12 mt-3 text-sm leading-6 text-[#7B6F65]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
