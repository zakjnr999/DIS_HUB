import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { CheckoutIcon } from "@/components/icons";

export function EmptyOrders() {
  return (
    <Card className="grid place-items-center rounded-md p-10 text-center">
      <CheckoutIcon className="h-14 w-14 text-teal-700" />
      <h2 className="mt-4 text-4xl font-light text-slate-950">No orders yet</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        New local demo orders will appear here after checkout is completed in
        this browser.
      </p>
      <Button className="mt-6" href="/shop">
        Open Shop
      </Button>
    </Card>
  );
}
