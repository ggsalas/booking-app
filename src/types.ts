export type BookedPeriodCalculations = { 
  days: number;
  priceRent: number;
  priceService: number;
  priceFinal: number;
}

export type BookedPeriod = {
  id: number;
  startDate: string;
  endDate: string;
  userId: 'me' | null;
  calculations?: BookedPeriodCalculations;
  pricePerDay: number;
}

export type Property = {
  id: string;
  image: string;
  thumbnail: string;
  title : string;
  description: string;
  pricePerDay: string;
  bookedPeriods: BookedPeriod[];
}
