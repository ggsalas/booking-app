import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { calculateBookingPeriod } from "./calculations";
import { CalendarDate } from "@internationalized/date";

// The reservation is by complete day
// A future improvement should be split the day in 2 considering checking and checkout hours.
// The startDate should always be at checking time
// The endDate should always be at checkout time
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
      days: 5,
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
