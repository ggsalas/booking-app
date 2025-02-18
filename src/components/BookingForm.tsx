import { Button, DateRangePicker, View } from "@adobe/react-spectrum";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { BookedPeriod } from "../types";
import { parseDate } from "@internationalized/date";
import { calculateBookingPeriod } from "../utils/calculations";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { useState } from "react";
import { BookingDetails } from "./BookingDetails";
import { useNavigation } from "react-router-dom";

type BookingFormProps = {
  bookedPeriod?: BookedPeriod;
  disabledPeriods: BookedPeriod[];
  pricePerDay: number;
  onSubmit: (data: BookedPeriod | undefined) => void;
  submitLabel: string;
};
type BookingFormState = {
  bookedPeriod?: BookedPeriod;
  error?: string;
};

export default function BookingForm({
  bookedPeriod = undefined,
  disabledPeriods,
  pricePerDay,
  onSubmit,
  submitLabel,
}: BookingFormProps) {
  const [formState, setFormState] = useState<BookingFormState>({
    bookedPeriod,
    error: undefined,
  });
  const navigation = useNavigation();

  // The end date is the previous day, because the checkout is at the morning
  // so the place is available on the end day.
  const disabledRanges =
    disabledPeriods?.map(({ startDate, endDate }) => [
      parseDate(startDate),
      parseDate(endDate).subtract({ days: 1 }),
    ]) ?? [];

  const handleOnDateChange = (range: RangeValue<DateValue>) => {
    // validate
    const error =
      disabledRanges.some(
        (interval) =>
          range &&
          range.end.compare(interval[0]) >= 0 &&
          range.start.compare(interval[1]) <= 0
      ) || range.end.compare(range.start) <= 0
        ? "Selected dates are not allowed"
        : undefined;

    // update values
    const newBookedPeriod = calculateBookingPeriod({
      range,
      pricePerDay,
      id: bookedPeriod?.id,
    });

    setFormState({ bookedPeriod: newBookedPeriod, error });
  };

  const periodToRange = (period?: BookedPeriod) => {
    if (!period) return null;

    return {
      start: parseDate(period.startDate),
      end: parseDate(period.endDate),
    };
  };

  return (
    <View marginY="size-300">
      <DateRangePicker
        isRequired
        width="100%"
        aria-label="book this property"
        data-testid="date-range-input"
        minValue={today(getLocalTimeZone())}
        value={periodToRange(formState.bookedPeriod)}
        isDateUnavailable={(date) =>
          disabledRanges.some(
            (interval) =>
              date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
          )
        }
        validate={() => formState.error}
        errorMessage={<div data-testid="error-message">{formState.error}</div>}
        onChange={handleOnDateChange}
      />

      <View marginY="size-300">
        {formState.bookedPeriod && !formState.error && (
          <BookingDetails bookedPeriod={formState.bookedPeriod} />
        )}
        <Button
          variant="accent"
          type="submit"
          width="100%"
          onPress={() => onSubmit(formState.bookedPeriod)}
          isDisabled={
            !formState.bookedPeriod ||
            !!formState.error ||
            navigation.state !== "idle"
          }
        >
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}
