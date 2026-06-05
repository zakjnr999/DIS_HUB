import {
  CalendarIcon,
  ClockIcon,
  ConfirmationIcon,
  DressSewingIcon,
  PickupIcon,
  RepairIcon,
} from "@/components/icons";

const steps = [
  {
    title: "Choose a service",
    description: "Pick the exact sewing, alteration, care, or consultation service.",
    icon: DressSewingIcon,
  },
  {
    title: "Add details",
    description: "Share material type, dress notes, and any design information.",
    icon: RepairIcon,
  },
  {
    title: "Upload images",
    description: "Add up to three clothing photos so the team can assess the work.",
    icon: ConfirmationIcon,
  },
  {
    title: "Choose pickup",
    description: "Bring the item yourself, request pickup, delivery, or both.",
    icon: PickupIcon,
  },
  {
    title: "Pick date and time",
    description: "Choose preferred service timing and urgency level.",
    icon: CalendarIcon,
  },
  {
    title: "Confirm booking",
    description: "Receive your booking reference and send details on WhatsApp.",
    icon: ClockIcon,
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-[#3B2416] text-[#FBF6ED]">
      <div className="container-shell">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#C8A96A]/30 bg-[#F7EFE3]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.1em] text-[#E8D8C3]">
            How it works
          </span>
          <h2 className="font-heading mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Book your clothing service in six simple steps.
          </h2>
          <div className="stitch-line mx-auto mt-5 w-28 opacity-60" />
          <p className="mt-5 text-base leading-7 text-[#E8D8C3]">
            A clear booking process designed for clothing details, pickup needs,
            and customer-service follow up.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                className="rounded-[2rem] border border-[#E8D8C3]/14 bg-[#FBF6ED]/7 p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#FBF6ED]/10"
                key={step.title}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-10 w-10 text-[#C8A96A]" />
                  <span className="rounded-full bg-[#F7EFE3]/10 px-3 py-1 text-sm font-black text-[#E8D8C3]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading mt-5 text-2xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#E8D8C3]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
