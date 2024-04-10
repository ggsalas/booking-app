import BookingForm from "../components/BookingForm";
import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { BookedPeriod } from "../types";
import { editBookedPeriod } from "../utils/dataHandler";
import { LoaderReturn } from "./property";
import { Button, Flex } from "@adobe/react-spectrum";
import { useEffect, useRef } from "react";

export async function action({ request }: LoaderFunctionArgs) {
  const data = await request.json();
  await editBookedPeriod(data);

  return redirect(`/properties/${data.propertyId}`);
}

export default function PropertyEditBooking() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const submit = useSubmit();
  const { property, disabledPeriods, bookedPeriod } = useRouteLoaderData(
    "property"
  ) as LoaderReturn;
  const navigation = useNavigation()

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ block: "start" });
    }
  }, []);

  const handleSubmit = (
    data: {
      bookedPeriod: BookedPeriod;
      propertyId: string;
    },
    action: string
  ) => {
    submit(data, {
      action,
      method: "post",
      encType: "application/json",
      preventScrollReset: true,
    });
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <h3 ref={titleRef}>Edit your reservation</h3>
        <Link to=".." relative="path" reloadDocument={false} preventScrollReset>
          Cancel
        </Link>
      </Flex>

      <BookingForm
        bookedPeriod={bookedPeriod}
        disabledPeriods={disabledPeriods}
        pricePerDay={Number(property.pricePerDay)}
        onSubmit={(bookedPeriod: BookedPeriod | undefined) => {
          if (bookedPeriod) {
            handleSubmit({ bookedPeriod, propertyId: property.id }, "");
          }
        }}
        submitLabel="Save your changes"
      />

      <Flex direction="column" gap="size-300" alignItems="stretch">
        <Button
          elementType="button"
          type="submit"
          variant="negative"
          width="100%"
          isDisabled={navigation.state !== "idle"}
          onPress={() => {
            if (bookedPeriod) {
              handleSubmit({ bookedPeriod, propertyId: property.id }, "delete");
            }
          }}
        >
          Delete
        </Button>
      </Flex>
    </>
  );
}
