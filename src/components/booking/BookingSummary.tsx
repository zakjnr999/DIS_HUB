import type { BookingFormValues } from "@/lib/validation";
import { formatDate } from "@/lib/utils";

const empty = "Not selected";

function valueOrEmpty(value?: string) {
  return value || empty;
}

export function BookingSummary({ values }: { values: Partial<BookingFormValues> }) {
  const items = [
    ["Customer", valueOrEmpty(values.customerName)],
    ["Phone", valueOrEmpty(values.phone)],
    [
      "Service",
      values.serviceType === "Other"
        ? valueOrEmpty(values.customService)
        : valueOrEmpty(values.serviceType),
    ],
    [
      "Material",
      values.materialType === "Other"
        ? valueOrEmpty(values.customMaterial)
        : valueOrEmpty(values.materialType),
    ],
    ["Price", valueOrEmpty(values.priceRange)],
    ["Pickup/delivery", valueOrEmpty(values.pickupOption)],
    ["Preferred date", formatDate(values.preferredDate)],
    ["Preferred time", valueOrEmpty(values.preferredTime)],
    ["Urgency", valueOrEmpty(values.urgency)],
  ];

  return (
    <aside className="rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/82 p-5 shadow-[0_18px_48px_rgba(59,36,22,0.08)] backdrop-blur lg:sticky lg:top-24">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7A5636]">
        Service receipt
      </p>
      <h2 className="font-heading mt-1 text-2xl font-bold text-[#1F1B18]">
        Live booking summary
      </h2>
      <div className="stitch-line mt-4" />
      <div className="mt-4 grid gap-3">
        {items.map(([label, value]) => (
          <div
            className="flex items-start justify-between gap-4 border-b border-[#E8D8C3]/60 pb-2 text-sm last:border-0"
            key={label}
          >
            <span className="text-[#7B6F65]">{label}</span>
            <span className="max-w-[12rem] text-right font-bold text-[#1F1B18]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
