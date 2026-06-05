import { BookingSuccess } from "@/components/booking/BookingSuccess";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const params = await searchParams;
  return <BookingSuccess reference={params.reference} />;
}
