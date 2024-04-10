import properties from "../utils/mockedProperties";
import { BookedPeriod, Property } from "../types";

const LS_PROPERTIES_KEY = "__properties__";

function wait(time: number) {
  return new Promise((res) => setTimeout(res, time));
}

export function setInitialData() {
  const hasData = localStorage.getItem(LS_PROPERTIES_KEY);

  if (!hasData) {
    console.log("Saving initial data");
    localStorage.setItem(LS_PROPERTIES_KEY, JSON.stringify(properties));
  }
}

export function getProperties() {
  const lsData = localStorage.getItem(LS_PROPERTIES_KEY);
  const properties = lsData ? JSON.parse(lsData)?.properties : [];

  return properties;
}

export function getProperty(propertyId: string) {
  const properties = getProperties();
  const property = properties.find((prop: Property) => prop.id === propertyId);

  if (!property) throw new Error("Propperty not found");

  return property;
}

export function getBookings(properties: Property[]) {
  const bookings = properties.filter((property) => {
    return property?.bookedPeriods.find(
      (period: BookedPeriod) => period.userId === "me"
    );
  });

  return bookings;
}

export function getPropertyPeriods(property: Property) {
  const bookedPeriod = property?.bookedPeriods.find(
    (period: BookedPeriod) => period.userId === "me"
  );
  const disabledPeriods = property?.bookedPeriods.filter(
    (period: BookedPeriod) => period.userId !== "me"
  );

  return { bookedPeriod, disabledPeriods };
}

type CreateBookedPeriodParams = {
  propertyId: string;
  bookedPeriod: BookedPeriod;
};

export async function createBookedPeriod({
  propertyId,
  bookedPeriod,
}: CreateBookedPeriodParams) {
  const properties = getProperties();
  const modifiedProperties = properties.map((property: Property) => {
    if (property.id === propertyId) {
      return {
        ...property,
        bookedPeriods: [...property.bookedPeriods, bookedPeriod],
      };
    } else {
      return property;
    }
  });

  await wait(2000);

  localStorage.setItem(
    LS_PROPERTIES_KEY,
    JSON.stringify({ properties: modifiedProperties })
  );
}

export async function editBookedPeriod({
  propertyId,
  bookedPeriod,
}: CreateBookedPeriodParams) {
  const properties = getProperties();
  const modifiedProperties = properties.map((property: Property) => {
    if (property.id === propertyId) {
      const bookingPeriodsWithoutEdited = property.bookedPeriods.filter(
        (period) => period.id !== bookedPeriod.id
      );

      return {
        ...property,
        bookedPeriods: [...bookingPeriodsWithoutEdited, bookedPeriod],
      };
    } else {
      return property;
    }
  });

  await wait(2000);

  localStorage.setItem(
    LS_PROPERTIES_KEY,
    JSON.stringify({ properties: modifiedProperties })
  );
}

export async function deleteBookedPeriod({
  propertyId,
  bookedPeriod,
}: CreateBookedPeriodParams) {
  const properties = getProperties();
  const modifiedProperties = properties.map((property: Property) => {
    if (property.id === propertyId) {
      const bookingPeriodsWithoutDeleted = property.bookedPeriods.filter(
        (period) => period.id !== bookedPeriod.id
      );

      return {
        ...property,
        bookedPeriods: bookingPeriodsWithoutDeleted,
      };
    } else {
      return property;
    }
  });

  await wait(2000);

  localStorage.setItem(
    LS_PROPERTIES_KEY,
    JSON.stringify({ properties: modifiedProperties })
  );
}
