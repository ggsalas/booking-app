import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { deleteBookedPeriod } from "../utils/dataHandler";

export async function loader({ params }: LoaderFunctionArgs) {
  const { propertyId } = params;

  return redirect(`/properties/${propertyId}`);
}

export async function action({ request }: LoaderFunctionArgs) {
  const data = await request.json();
  await deleteBookedPeriod(data);

  return redirect(`/properties/${data.propertyId}`);
}
