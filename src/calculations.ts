import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { BookedPeriod } from "./types";

type CalculatePriceParams = {
  range: RangeValue<DateValue>;
  pricePerDay: number;
};

// Hardcoded values
const SERVICE_PRICE = 0.1;
const USER_ID = 'me';

export function calculateBookingPeriod({ range, pricePerDay }: CalculatePriceParams): BookedPeriod {
  const id = Date.now();
  const startDate = range.start.toString();
  const endDate = range.end.toString();
  const days = range.end.compare(range.start) + 1;
  const priceRent = pricePerDay * days;
  const priceService = priceRent * SERVICE_PRICE;
  const priceFinal = priceRent + priceService;

  return {
    id,
    startDate,
    endDate,
    userId: USER_ID,
    pricePerDay,
    calculations: { days, priceRent, priceService, priceFinal },
  };
}
