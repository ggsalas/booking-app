import {
  Grid,
  Image,
  Text,
  Button,
  View,
  Well,
  Flex,
} from "@adobe/react-spectrum";
import { Link, useLoaderData } from "react-router-dom";
import { getProperties, getPropertyPeriods } from "../dataHandler";
import { formatCurrency } from "../formatters";
import { Property } from "../types";
import { BookingDates } from "../components/BookingDates";

export function loader() {
  const properties = getProperties();

  return { properties };
}

export default function Properties() {
  const { properties } = useLoaderData();

  const bookMessage = (property: Property) => {
    const { bookedPeriod } = getPropertyPeriods(property);

    if (bookedPeriod) {
      return <BookingDates bookedPeriod={bookedPeriod} />;
    } else {
      return (
        <div style={{ textAlign: "right" }}>
          Book for {formatCurrency(property.pricePerDay)} / day
        </div>
      );
    }
  };

  return (
    <Grid
      columns={{ L: "repeat(3, 1fr)", M: "repeat(2, 1fr)", S: "1fr" }}
      gap="size-100"
      width={{ L: "1200px", M: "100%", base: "100%" }}
      marginY="size-200"
    >
      {properties.map((property: Property, index: number) => (
        <View key={index} width="auto" flexShrink={1}>
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
                    <Text marginTop="size-100">{property.title}</Text>
                    <Text marginTop="size-100">{property.description}</Text>
                  </View>

                  <View marginTop="size-150">
                    <Well marginTop="size-200">{bookMessage(property)}</Well>
                  </View>
                </Flex>
              </Flex>
            </View>
          </Link>
        </View>
      ))}
    </Grid>
  );
}
