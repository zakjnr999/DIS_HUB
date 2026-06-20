import { Card } from "@/components/common/Card";
import {
  CheckoutIcon,
  ConfirmationIcon,
  DeliveryIcon,
  PackageIcon,
} from "@/components/icons";
import { formatCurrency } from "@/lib/utils";

export function OrderStats({
  stats,
}: {
  stats: {
    cancelled: number;
    delivered: number;
    outForDelivery: number;
    pending: number;
    processing: number;
    revenue: number;
    total: number;
  };
}) {
  const cards = [
    { label: "Total orders", value: stats.total, icon: CheckoutIcon },
    { label: "Pending", value: stats.pending, icon: PackageIcon },
    { label: "Out for delivery", value: stats.outForDelivery, icon: DeliveryIcon },
    { label: "Delivered", value: stats.delivered, icon: ConfirmationIcon },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card className="rounded-md p-5" key={card.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">{card.label}</p>
                <p className="mt-2 text-4xl font-light text-slate-950">
                  {card.value}
                </p>
              </div>
              <Icon className="h-10 w-10 text-teal-700" />
            </div>
          </Card>
        );
      })}
      <Card className="rounded-md p-5 lg:col-span-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-500">Demo revenue summary</p>
            <p className="mt-2 text-3xl font-black text-slate-950">
              {formatCurrency(stats.revenue)}
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-500">
            Processing: {stats.processing} | Cancelled: {stats.cancelled}
          </p>
        </div>
      </Card>
    </div>
  );
}
