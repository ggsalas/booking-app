import {
  Grid,
  Image,
  Text,
  View,
  Flex,
  Heading,
  Well,
} from "@adobe/react-spectrum";
import { Link, useRouteLoaderData, useSearchParams } from "react-router-dom";
import { getPropertyPeriods } from "../utils/dataHandler";
import { formatCurrency } from "../utils/formatters";
import { Property } from "../types";
import { BookingDates } from "../components/BookingDates";
import { LoaderReturn } from "./layout";
import CustomWell from "../components/CustomWell";

export default function Properties() {
  const { properties, bookings } = useRouteLoaderData(
    "properties"
  ) as LoaderReturn;
  const [searchParams] = useSearchParams();
  const showMyBookings = searchParams.get("filter") === "booked";
  const displayedProperties = showMyBookings ? bookings : properties;

  const bookMessage = (property: Property) => {
    const { bookedPeriod } = getPropertyPeriods(property);

    if (bookedPeriod) {
      return (
        <CustomWell marginTop="size-200">
          <BookingDates bookedPeriod={bookedPeriod} />
        </CustomWell>
      );
    } else {
      return (
        <CustomWell color="blue" marginTop="size-200">
          <span>Book for {formatCurrency(property.pricePerDay)} / day</span>
        </CustomWell>
      );
    }
  };

  if (displayedProperties.length === 0) {
    return (
      <Flex marginY="size-200" alignItems="center">
        <Well>No properties found</Well>
      </Flex>
    );
  }

  return (
    <Grid
      columns={{ L: "repeat(3, 1fr)", M: "repeat(2, 1fr)", S: "1fr" }}
      gap="size-100"
      width={{ L: "1200px", M: "100%", base: "100%" }}
      marginY="size-200"
      data-testid="properties-grid"
    >
      {displayedProperties.map((property: Property, index: number) => (
        <View
          key={index}
          width="auto"
          flexShrink={1}
          data-testid="properties-grid-item"
        >
          <Link
            to={property.id}
            style={{ textDecoration: "initial", color: "initial" }}
          >
            <View
              padding="size-200"
              backgroundColor="gray-50"
              borderWidth="thin"
              borderColor="gray-200"
              borderRadius="medium"
              height="100%"
            >
              <Flex
                direction="column"
                justifyContent="space-between"
                height="100%"
                flexGrow={1}
              >
                <Image
                  src={property.thumbnail}
                  alt={property.title}
                  width="100%"
                  height="auto"
                  objectFit="cover"
                  UNSAFE_style={{ aspectRatio: "4/3" }}
                  marginBottom="size-150"
                />
                <Flex
                  direction="column"
                  justifyContent="space-between"
                  flexGrow={1}
                >
                  <View>
                    <Heading level={3} marginTop="size-100">
                      {property.title}
                    </Heading>
                    <Text marginTop="size-100">{property.description}</Text>
                  </View>

                  <View marginTop="size-150">{bookMessage(property)}</View>
                </Flex>
              </Flex>
            </View>
          </Link>
        </View>
      ))}
    </Grid>
  );
}
