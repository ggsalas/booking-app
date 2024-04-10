import BookingForm from "../components/BookingForm";
import {
  LoaderFunctionArgs,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { BookedPeriod } from "../types";
import { createBookedPeriod } from "../utils/dataHandler";
import { BookingDetails } from "../components/BookingDetails";
import { BookingDates } from "../components/BookingDates";
import { LoaderReturn } from "./property";
import LinkButton from "../components/LinkButton";
import { Well } from "@adobe/react-spectrum";

export async function action({ request }: LoaderFunctionArgs) {
  const data = await request.json();
  await createBookedPeriod(data);
  return data;
}

export default function PropertyIndex() {
  const submit = useSubmit();
  const { property, disabledPeriods, bookedPeriod } = useRouteLoaderData(
    "property"
  ) as LoaderReturn;

  const handleSubmit = (data: {
    bookedPeriod: BookedPeriod;
    propertyId: string;
  }) => {
    submit(data, {
      method: "post",
      encType: "application/json",
    });
  };

  if (bookedPeriod) {
    return (
      <div>
        <h3>Your booking is saved</h3>

        <Well>
          <BookingDates bookedPeriod={bookedPeriod} />
        </Well>

        <BookingDetails bookedPeriod={bookedPeriod} />

        <LinkButton to="edit">Change booking</LinkButton>
      </div>
    );
  } else {
    return (
      <>
        <h3>Book this property</h3>

        <BookingForm
          disabledPeriods={disabledPeriods}
          pricePerDay={Number(property.pricePerDay)}
          onSubmit={(bookedPeriod: BookedPeriod | undefined) => {
            if (bookedPeriod) {
              handleSubmit({ bookedPeriod, propertyId: property.id });
            }
          }}
          submitLabel="Book this property"
        />
      </>
    );
  }
}
