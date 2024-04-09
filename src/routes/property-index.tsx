import BookingForm from "../components/BookingForm";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { BookedPeriod } from "../types";
import { createBookedPeriod } from "../dataHandler";
import { BookingDetails } from "../components/BookingDetails";
import { Well } from "@adobe/react-spectrum";
import { BookingDates } from "../components/BookingDates";

export async function action({ request }) {
  const data = await request.json();

  createBookedPeriod(data);

  return data;
}

export default function PropertyIndex() {
  const submit = useSubmit();
  const { property, disabledPeriods, bookedPeriod } =
    useRouteLoaderData("property");

  const handleSubmit = (data: BookedPeriod) => {
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

        <Link to="edit">Change booking</Link>
        <Link to="delete">Delete</Link>
      </div>
    );
  } else {
    return (
      <>
        <h3>Book this property</h3>
        <BookingForm
          disabledPeriods={disabledPeriods}
          pricePerDay={property.pricePerDay}
          onSubmit={(bookedPeriod: BookedPeriod) =>
            handleSubmit({ bookedPeriod, propertyId: property.id })
          }
        />
      </>
    );
  }
}
