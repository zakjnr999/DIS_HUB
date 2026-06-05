import { BookingForm } from "@/components/booking/BookingForm";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  return <BookingForm initialService={params.service} />;
}
