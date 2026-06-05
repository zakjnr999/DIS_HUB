import { Card } from "@/components/common/Card";
import { BookingStatusIcon, CalendarIcon, ConfirmationIcon, ClockIcon } from "@/components/icons";

export function BookingStats({
  stats,
}: {
  stats: {
    completed: number;
    inProgress: number;
    received: number;
    total: number;
  };
}) {
  const cards = [
    { label: "Total bookings", value: stats.total, icon: BookingStatusIcon },
    { label: "Booking received", value: stats.received, icon: CalendarIcon },
    { label: "In progress", value: stats.inProgress, icon: ClockIcon },
    { label: "Completed", value: stats.completed, icon: ConfirmationIcon },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card className="p-5 transition duration-300 hover:-translate-y-1" key={card.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#7B6F65]">{card.label}</p>
                <p className="font-heading mt-2 text-4xl font-bold text-[#1F1B18]">
                  {card.value}
                </p>
              </div>
              <Icon className="h-11 w-11 text-[#C8A96A]" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
