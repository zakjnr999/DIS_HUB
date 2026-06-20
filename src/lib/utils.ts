export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, currency: "GHS" = "GHS") {
  if (value === 0) {
    return "Price to confirm";
  }

  if (currency === "GHS") {
    return `₵${value.toFixed(2)}`;
  }

  return new Intl.NumberFormat("en-GH", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

export function formatDate(value?: string) {
  if (!value) {
    return "Not selected";
  }

  return new Intl.DateTimeFormat("en-GH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
