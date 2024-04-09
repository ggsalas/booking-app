import properties from "./mockedProperties.json";
import { BookedPeriod, Property } from "./types";

const LS_PROPERTIES_KEY = "__properties__";

export function setInitialData() {
  const hasData = localStorage.getItem(LS_PROPERTIES_KEY);
  console.log({ hasData });

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

export function createBookedPeriod({
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

  localStorage.setItem(
    LS_PROPERTIES_KEY,
    JSON.stringify({ properties: modifiedProperties })
  );
}
