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

export default function BookingForm({
  bookedPeriod = undefined,
  disabledPeriods,
  pricePerDay,
  onSubmit,
  submitLabel,
}: BookingFormProps) {
  const [formBookedPeriod, setFormBookedPeriod] = useState<
    BookedPeriod | undefined
  >(bookedPeriod);
  const navigation = useNavigation()

  const disabledRanges =
    disabledPeriods?.map(({ startDate, endDate }) => [
      parseDate(startDate),
      parseDate(endDate),
    ]) ?? [];

  const handleOnDateChange = (range: RangeValue<DateValue>) => {
    const newBookedPeriod = calculateBookingPeriod({
      range,
      pricePerDay,
      id: bookedPeriod?.id,
    });

    setFormBookedPeriod(newBookedPeriod);
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
        width="100%"
        aria-label="book this property"
        minValue={today(getLocalTimeZone())}
        value={periodToRange(formBookedPeriod)}
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
          <Button
            variant="accent"
            type="submit"
            width="100%"
            onPress={() => onSubmit(formBookedPeriod)}
            isDisabled={navigation.state !== "idle"}
          >
            {submitLabel}
          </Button>
        </>
      )}
    </View>
  );
}
