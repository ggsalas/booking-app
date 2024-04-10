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

  const dates = () => {
    if (bookedPeriod.calculations?.days === 1) {
      return (
        <>
          <strong>{start}</strong>
          {` of `}
          <span>{year}</span>
        </>
      );
    } else {
      return (
        <>
          <strong>{start}</strong>
          {` to `}
          <strong>{end}</strong>
          {` of `} <span>{year}</span>
        </>
      );
    }
  };

  return (
    <p
      style={{
        margin: 0,
        textAlign: "center",
      }}
    >
      {dates()}
    </p>
  );
}
