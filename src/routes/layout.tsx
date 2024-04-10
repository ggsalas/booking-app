import { Flex, View, Heading } from "@adobe/react-spectrum";
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useMatch,
  useSearchParams,
} from "react-router-dom";
import { getBookings, getProperties, setInitialData } from "../utils/dataHandler";
import { Property } from "../types";
import LinkButton from "../components/LinkButton";

export type LoaderReturn = {
  properties: Property[];
  bookings: Property[];
};

export async function loader(): Promise<LoaderReturn> {
  setInitialData();
  const properties = getProperties();
  const bookings = getBookings(properties);

  return { properties, bookings };
}

export default function Layout() {
  const { bookings } = useLoaderData() as LoaderReturn;
  const isHomePage = useMatch("/properties");
  const [searchParams] = useSearchParams();
  const hasFilter = searchParams.get("filter");

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Flex
        direction="column"
        minHeight="100lvh"
        height="auto"
        position="relative"
      >
        {/* Header */}
        <Flex direction="row" justifyContent="center" position="sticky" top={0}>
          <View
            paddingX="size-200"
            paddingY="size-300"
            height="size-500"
            width="100%"
            borderBottomWidth="thick"
            backgroundColor="static-white"
          >
            <Flex
              maxWidth={{ L: "1200px", M: "100%", S: "100%" }}
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex width="30%" justifyContent="start">
                {(!isHomePage || (isHomePage && hasFilter)) && (
                  <LinkButton to="/properties">{`< Back`}</LinkButton>
                )}
              </Flex>

              <Flex width="40%" justifyContent="center">
                <Heading level={1}>Booking App</Heading>
              </Flex>

              <Flex width="30%" justifyContent="end">
                {bookings?.length > 0 && (
                  <LinkButton to="/properties?filter=booked">Booked</LinkButton>
                )}
              </Flex>
            </Flex>
          </View>
        </Flex>

        {/* Body */}
        <View paddingX="size-200" flexGrow={1}>
          <Flex direction="row" justifyContent="center" width="100%">
            <Outlet />
          </Flex>
        </View>
      </Flex>
    </>
  );
}
