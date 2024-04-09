import { Button, DateRangePicker, View } from "@adobe/react-spectrum";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { BookedPeriod } from "../types";
import { parseDate } from "@internationalized/date";
import { calculateBookingPeriod } from "../calculations";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { useState } from "react";
import { BookingDetails } from "./BookingDetails";

type BookingFormProps = {
  bookedPeriod?: BookedPeriod[];
  disabledPeriods: BookedPeriod[];
  pricePerDay: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any, 
};

export default function BookingForm({
  // bookedPeriod, TODO: edit form
  disabledPeriods,
  pricePerDay,
  onSubmit,
}: BookingFormProps) {
  const [formBookedPeriod, setFormBookedPeriod] =
    useState<BookedPeriod | null>();

  const disabledRanges =
    disabledPeriods?.map(({ startDate, endDate }) => [
      parseDate(startDate),
      parseDate(endDate),
    ]) ?? [];

  const handleOnDateChange = (range: RangeValue<DateValue>) => {
    const bookedPeriod = calculateBookingPeriod({ range, pricePerDay });

    setFormBookedPeriod(bookedPeriod);
  };

  return (
    <View marginY="size-300">
        <DateRangePicker
          width="100%"
          aria-label="book this property"
          minValue={today(getLocalTimeZone())}
          isDateUnavailable={(date) =>
            disabledRanges.some(
              (interval) =>
                date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
            )
          }
          validate={(value) =>
            disabledRanges.some(
              (interval) =>
                value &&
                value.end.compare(interval[0]) >= 0 &&
                value.start.compare(interval[1]) <= 0
            )
              ? "Selected date range may not include unavailable dates."
              : null
          }
          validationBehavior="native"
          onChange={handleOnDateChange}
        />

        {formBookedPeriod && (
          <>
            <BookingDetails bookedPeriod={formBookedPeriod} />
            <Button variant="accent" type="submit" width="100%" onPress={() => onSubmit(formBookedPeriod)}>
              Book this property
            </Button>
          </>
        )}
    </View>
  );
}
