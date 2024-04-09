import { Outlet, useLoaderData } from "react-router-dom";
import { Flex, View, Image } from "@adobe/react-spectrum";
import { getProperty, getPropertyPeriods } from "../dataHandler";

export function loader({ params }) {
  const { propertyId } = params;
  const property = getProperty(propertyId);
  const periods = getPropertyPeriods(property)

  return { property, ...periods }
}

export default function Property() {
  const { property } = useLoaderData();

  return (
    <Flex
      width={{ L: "1200px", M: "100%", base: "100%" }}
      direction="column"
      marginTop="size-200"
      marginBottom="size-1200"
    >
      <View>
        <Image
          src={property.image}
          alt={property.title}
          width="100%"
          height="auto"
          objectFit="cover"
          UNSAFE_style={{ aspectRatio: '16/9'}}
        />
      </View>

      <Flex direction={{ base: "column", M: "row" }}>
        <View flexBasis="60%" paddingEnd={{ base: 0, M: "size-200" }}>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
        </View>

        <View flexBasis="40%">
          <Outlet />
        </View>
      </Flex>
    </Flex>
  );
}
