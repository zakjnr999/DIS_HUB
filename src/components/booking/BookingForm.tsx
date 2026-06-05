"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FieldPath } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { FieldShell, Input, Select, Textarea } from "@/components/common/Field";
import { BookingStepper } from "@/components/booking/BookingStepper";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { ImageUpload } from "@/components/booking/ImageUpload";
import { materialTypes } from "@/data/materialTypes";
import { pickupOptions, pickupRequiredOptions } from "@/data/pickupOptions";
import { priceRanges } from "@/data/priceRanges";
import { serviceOptions, services } from "@/data/services";
import { images } from "@/config/images";
import { createBookingReference } from "@/lib/bookingReference";
import { getBookings, saveBooking } from "@/lib/bookingStorage";
import {
  bookingSchema,
  defaultBookingValues,
  type BookingFormValues,
} from "@/lib/validation";
import type { Booking } from "@/types/booking";

const steps = [
  "Customer",
  "Service",
  "Material",
  "Pickup",
  "Schedule",
  "Review",
];

const stepFields: FieldPath<BookingFormValues>[][] = [
  ["customerName", "phone", "email", "address", "landmark"],
  ["serviceType", "customService", "priceRange"],
  ["materialType", "customMaterial", "imageUrls"],
  ["pickupOption", "pickupAddress", "pickupLandmark", "pickupDate", "pickupTime"],
  ["preferredDate", "preferredTime", "urgency", "notes"],
  ["confirmed"],
];

export function BookingForm({ initialService }: { initialService?: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm<BookingFormValues>({
    defaultValues: defaultBookingValues,
    mode: "onBlur",
    resolver: zodResolver(bookingSchema),
  });

  const watchedValues = useWatch({ control });
  const values: BookingFormValues = { ...defaultBookingValues, ...watchedValues };
  const watchedImages = values.imageUrls || [];
  const needsPickup = pickupRequiredOptions.includes(values.pickupOption);
  const selectedService = values.serviceType;
  const selectedMaterial = values.materialType;

  useEffect(() => {
    const service = services.find((item) => item.slug === initialService);
    if (service) {
      setValue("serviceType", service.title, { shouldValidate: true });
    }
  }, [initialService, setValue]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function nextStep() {
    const isValid = await trigger(stepFields[currentStep]);
    if (isValid) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    }
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function submitBooking(data: BookingFormValues) {
    setIsSubmitting(true);
    const existingBookings = getBookings();
    const reference = createBookingReference(existingBookings);
    const booking: Booking = {
      id: crypto.randomUUID(),
      reference,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || undefined,
      address: data.address,
      landmark: data.landmark || undefined,
      serviceType: data.serviceType,
      customService: data.customService || undefined,
      materialType: data.materialType,
      customMaterial: data.customMaterial || undefined,
      imageUrls: data.imageUrls,
      priceRange: data.priceRange,
      pickupOption: data.pickupOption,
      pickupAddress: data.pickupAddress || undefined,
      pickupLandmark: data.pickupLandmark || undefined,
      pickupDate: data.pickupDate || undefined,
      pickupTime: data.pickupTime || undefined,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      urgency: data.urgency,
      notes: data.notes || undefined,
      status: "Booking Received",
      createdAt: new Date().toISOString(),
    };

    saveBooking(booking);
    router.push(`/booking-success?reference=${reference}`);
  }

  return (
    <div className="section-padding bg-[#FBF6ED]">
      <div className="container-shell">
      <div className="mb-9 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-[#7A5636]">
          Book a service
        </p>
        <h1 className="font-heading mt-3 text-5xl font-bold leading-tight text-[#1F1B18] md:text-7xl">
          Tell us what your outfit needs.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#7B6F65]">
          Complete the guided form and receive a booking reference for customer
          service follow-up.
        </p>
        <div className="stitch-line mt-6 w-36" />
      </div>

      <BookingStepper currentStep={currentStep} steps={steps} />

      <form
        className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
        onSubmit={handleSubmit(submitBooking)}
      >
        <Card className="p-5 md:p-7 self-start">
          {currentStep === 0 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Share the contact and location details customer service should use for this booking."
                title="Customer details"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FieldShell
                  error={errors.customerName?.message}
                  label="Full name"
                  required
                >
                  <Input placeholder="e.g. Adjoa Mensah" {...register("customerName")} />
                </FieldShell>
                <FieldShell error={errors.phone?.message} label="Phone number" required>
                  <Input placeholder="+233 XX XXX XXXX" {...register("phone")} />
                </FieldShell>
                <FieldShell error={errors.email?.message} label="Email address">
                  <Input placeholder="name@example.com" type="email" {...register("email")} />
                </FieldShell>
                <FieldShell error={errors.landmark?.message} label="Landmark">
                  <Input placeholder="Near..." {...register("landmark")} />
                </FieldShell>
              </div>
              <FieldShell
                error={errors.address?.message}
                label="Location/address"
                required
              >
                <Textarea placeholder="Area, street, house number" {...register("address")} />
              </FieldShell>
            </div>
          ) : null}

          {currentStep === 1 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Choose one service and select an estimated budget range."
                title="Service and price range"
              />
              <FieldShell error={errors.serviceType?.message} label="Service type" required>
                <Select {...register("serviceType")}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </Select>
              </FieldShell>
              {selectedService === "Other" ? (
                <FieldShell
                  error={errors.customService?.message}
                  label="Other service"
                  required
                >
                  <Input
                    placeholder="Describe the clothing service you need"
                    {...register("customService")}
                  />
                </FieldShell>
              ) : null}
              <FieldShell
                error={errors.priceRange?.message}
                hint="Final price may depend on material, design, urgency, and service complexity."
                label="Estimated price range"
                required
              >
                <Select {...register("priceRange")}>
                  <option value="">Select a price range</option>
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Select>
              </FieldShell>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Add material information and optional images for a clearer service review."
                title="Material and dress images"
              />
              <FieldShell
                error={errors.materialType?.message}
                label="Material/fabric type"
                required
              >
                <Select {...register("materialType")}>
                  <option value="">Select material</option>
                  {materialTypes.map((material) => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </Select>
              </FieldShell>
              {selectedMaterial === "Other" ? (
                <FieldShell
                  error={errors.customMaterial?.message}
                  label="Other material"
                  required
                >
                  <Input
                    placeholder="Type the material or fabric name"
                    {...register("customMaterial")}
                  />
                </FieldShell>
              ) : null}
              <ImageUpload
                onChange={(urls) =>
                  setValue("imageUrls", urls, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                value={watchedImages}
              />
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Choose how the clothing item should reach Adi3ye Services and return to you."
                title="Pickup and delivery"
              />
              <FieldShell
                error={errors.pickupOption?.message}
                label="Pickup/delivery option"
                required
              >
                <Select {...register("pickupOption")}>
                  <option value="">Select an option</option>
                  {pickupOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FieldShell>
              {values.pickupOption &&
              values.pickupOption !== "I will bring the dress myself" ? (
                <p className="rounded-2xl bg-[#F7EFE3] p-4 text-sm font-bold text-[#7A5636]">
                  Pickup or delivery may attract an extra fee depending on your
                  location.
                </p>
              ) : null}
              {needsPickup ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldShell
                    error={errors.pickupAddress?.message}
                    label="Pickup address"
                    required
                  >
                    <Textarea
                      placeholder="Where should we pick it up?"
                      {...register("pickupAddress")}
                    />
                  </FieldShell>
                  <FieldShell
                    error={errors.pickupLandmark?.message}
                    label="Pickup landmark"
                  >
                    <Textarea
                      placeholder="A nearby landmark"
                      {...register("pickupLandmark")}
                    />
                  </FieldShell>
                  <FieldShell
                    error={errors.pickupDate?.message}
                    label="Preferred pickup date"
                    required
                  >
                    <Input min={today} type="date" {...register("pickupDate")} />
                  </FieldShell>
                  <FieldShell
                    error={errors.pickupTime?.message}
                    label="Preferred pickup time"
                    required
                  >
                    <Input type="time" {...register("pickupTime")} />
                  </FieldShell>
                </div>
              ) : null}
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Choose the date, time, and urgency level for the service work."
                title="Preferred service date and time"
              />
              <div className="grid gap-4 md:grid-cols-3">
                <FieldShell
                  error={errors.preferredDate?.message}
                  label="Preferred service date"
                  required
                >
                  <Input min={today} type="date" {...register("preferredDate")} />
                </FieldShell>
                <FieldShell
                  error={errors.preferredTime?.message}
                  label="Preferred service time"
                  required
                >
                  <Input type="time" {...register("preferredTime")} />
                </FieldShell>
                <FieldShell
                  error={errors.urgency?.message}
                  label="Urgency level"
                  required
                >
                  <Select {...register("urgency")}>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Not sure">Not sure</option>
                  </Select>
                </FieldShell>
              </div>
              <FieldShell label="Special instructions / extra details">
                <Textarea
                  placeholder="Add measurements, damage details, delivery instructions, or style notes"
                  {...register("notes")}
                />
              </FieldShell>
            </div>
          ) : null}

          {currentStep === 5 ? (
            <div className="grid gap-5">
              <StepTitle
                description="Review your information before creating the booking reference."
                title="Review and confirm"
              />
              <ReviewGrid values={values} />
              {watchedImages.length ? (
                <div>
                  <p className="mb-3 text-sm font-bold text-[#33231c]">
                    Uploaded images
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {watchedImages.map((url, index) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={`Uploaded clothing preview ${index + 1}`}
                        className="h-32 rounded-[1.5rem] border border-[#E8D8C3] object-cover"
                        key={url}
                        src={url}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              <label className="flex items-start gap-3 rounded-2xl bg-[#F7EFE3] p-4 text-sm font-bold text-[#3B2416]">
                <input
                  className="mt-1 h-4 w-4 accent-[#3B2416]"
                  type="checkbox"
                  {...register("confirmed")}
                />
                <span>I confirm that the details provided are correct.</span>
              </label>
              {errors.confirmed?.message ? (
                <p className="text-xs font-bold text-[#9A4A3C]">
                  {errors.confirmed.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E8D8C3] pt-5 sm:flex-row sm:justify-between">
            <Button
              disabled={currentStep === 0}
              onClick={previousStep}
              variant="secondary"
            >
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={() => void nextStep()}>Continue</Button>
            ) : (
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Booking..." : "Book Service"}
              </Button>
            )}
          </div>
        </Card>

        <div className="grid content-start gap-5">
          <BookingSummary values={values} />
          <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#E8D8C3] bg-[#F7EFE3] shadow-[0_20px_54px_rgba(59,36,22,0.11)] sm:block">
            <div className="relative aspect-[4/5]">
              <Image
                alt={images.bookingSide.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                src={images.bookingSide.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B2416]/52 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] bg-[#FFFDF8]/88 p-4 text-sm font-bold text-[#1F1B18] backdrop-blur">
                Add fabric notes, images, pickup needs, and your preferred
                service time in one guided booking.
              </p>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

function StepTitle({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div>
      <h2 className="font-heading text-3xl font-bold text-[#1F1B18]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#7B6F65]">{description}</p>
    </div>
  );
}

function ReviewGrid({ values }: { values: BookingFormValues }) {
  const rows = [
    ["Full name", values.customerName],
    ["Phone", values.phone],
    ["Email", values.email || "Not provided"],
    ["Address", values.address],
    ["Landmark", values.landmark || "Not provided"],
    [
      "Service",
      values.serviceType === "Other"
        ? values.customService || values.serviceType
        : values.serviceType,
    ],
    [
      "Material",
      values.materialType === "Other"
        ? values.customMaterial || values.materialType
        : values.materialType,
    ],
    ["Price range", values.priceRange],
    ["Pickup/delivery", values.pickupOption],
    ["Pickup address", values.pickupAddress || "Not required"],
    ["Pickup date", values.pickupDate || "Not required"],
    ["Pickup time", values.pickupTime || "Not required"],
    ["Preferred service date", values.preferredDate],
    ["Preferred service time", values.preferredTime],
    ["Urgency", values.urgency],
    ["Notes", values.notes || "None"],
  ];

  return (
    <div className="grid gap-3 rounded-[1.5rem] bg-[#F7EFE3] p-4 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#7A5636]">
            {label}
          </p>
          <p className="mt-1 text-sm font-bold text-[#1F1B18]">{value}</p>
        </div>
      ))}
    </div>
  );
}
