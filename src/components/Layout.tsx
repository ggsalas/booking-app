import { Flex, View, Text } from "@adobe/react-spectrum";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Flex direction="column" minHeight="100lvh" height="auto">
      {/* Header */}
      <Flex direction="row" justifyContent="center">
        <View
          paddingX="size-200"
          height="size-500"
          backgroundColor="gray-400"
          width="100%"
        >
          <Flex
            maxWidth={{ L: "1200px", M: "100%", S: "100%" }}
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Link to="/">
              <Text>Booking App</Text>
            </Link>
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
  );
}
