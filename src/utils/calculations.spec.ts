import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { calculateBookingPeriod } from "./calculations";
import { CalendarDate } from "@internationalized/date";

test("should calculate a booking period from date range and price", () => {
  const range: RangeValue<DateValue> = {
    start: new CalendarDate(2024, 4, 10),
    end: new CalendarDate(2024, 4, 14),
  };
  const pricePerDay = 120;
  const id = 123;

  const bookingPeriod = calculateBookingPeriod({ range, pricePerDay, id });

  expect(bookingPeriod).toMatchObject({
    calculations: {
      days: 4,
      priceFinal: 660,
      priceRent: 600,
      priceService: 60,
    },
    endDate: "2024-04-14",
    id: 123,
    pricePerDay: 120,
    startDate: "2024-04-10",
    userId: "me",
  });
});
