import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { BookingStatusIcon } from "@/components/icons";
import { images } from "@/config/images";

export function EmptyBookings() {
  return (
    <Card className="grid place-items-center p-10 text-center">
      <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-[2rem] bg-[#F7EFE3]">
        <Image
          alt={images.adminEmpty.alt}
          className="object-cover"
          fill
          sizes="320px"
          src={images.adminEmpty.src}
        />
      </div>
      <BookingStatusIcon className="mt-5 h-12 w-12 text-[#C8A96A]" />
      <h2 className="font-heading mt-4 text-4xl font-bold text-[#1F1B18]">
        No bookings yet
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#7B6F65]">
        New customer bookings will appear here after someone completes the
        customer booking form.
      </p>
      <Button className="mt-6" href="/book">
        Create Booking
      </Button>
    </Card>
  );
}
