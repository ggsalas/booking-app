import { Flex, View, Well } from "@adobe/react-spectrum";
import { formatCurrency } from "../formatters";
import { BookedPeriod } from "../types";

type BookingPeriodProps = {
  bookedPeriod: BookedPeriod;
};

export function BookingDetails({ bookedPeriod }: BookingPeriodProps) {
  const priceData = [
    {
      label: `${formatCurrency(bookedPeriod?.pricePerDay)} for ${
        bookedPeriod?.calculations?.days
      } ${bookedPeriod?.calculations?.days === 1 ? "day" : "days"}`,
      value: formatCurrency(bookedPeriod?.calculations?.priceRent),
      size: "var(--spectrum-global-dimension-font-size-150)",
    },
    {
      label: "Service Price",
      value: formatCurrency(bookedPeriod?.calculations?.priceService),
      size: "var(--spectrum-global-dimension-font-size-150)",
    },
    {
      label: "Total",
      value: formatCurrency(bookedPeriod?.calculations?.priceFinal),
      size: "var(--spectrum-global-dimension-font-size-400)",
    },
  ];

  return (
    <View marginY="size-300">
      {priceData.map((el, i) => (
        <View
          key={el.label}
          borderTopWidth={priceData.length - 1 === i ? "thin" : undefined}
        >
          <Flex justifyContent="space-between">
            <p style={{ fontSize: el.size, margin: 0, lineHeight: "2.5em" }}>
              {el.label}
            </p>
            <p style={{ fontSize: el.size, margin: 0, lineHeight: "2.5em" }}>
              {el.value}
            </p>
          </Flex>
        </View>
      ))}
    </View>
  );
}
