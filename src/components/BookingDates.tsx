import { formatDate } from "../utils/formatters";
import { BookedPeriod } from "../types";

type BookingDatesProps = {
  bookedPeriod: BookedPeriod;
};

export function BookingDates({ bookedPeriod }: BookingDatesProps) {
  const options = {
    day: "numeric",
    month: "short",
  } as Intl.DateTimeFormatOptions;
  const start = formatDate(bookedPeriod?.startDate, options);
  const end = formatDate(bookedPeriod?.endDate, options);
  const year = formatDate(bookedPeriod?.endDate, { year: "numeric" });

  return (
    <p style={{ margin: 0, textAlign: "center" }}>
      <strong>{start}</strong>
      {` to `}
      <strong>{end}</strong>
      {` of `}
      <span>{year}</span>
    </p>
  );
}
