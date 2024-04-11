import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import Properties from "./routes/properties";
import Property, { loader as propertyLoader } from "./routes/property";
import PropertyIndex, {
  action as propertyIndexAction,
} from "./routes/property-index";
import PropertyEditBooking, {
  action as propertyEditBookingAction,
} from "./routes/property-edit-booking";
import {
  action as propertyDeleteBookingAction,
  loader as propertyDeleteBookingLoader,
} from "./routes/property-delete-booking";
import Layout, { loader as loaderLayout } from "./routes/layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}></Route>

      <Route errorElement={<ErrorPage />}>
        <Route
          id="properties"
          path="properties"
          element={<Layout />}
          loader={loaderLayout}
        >
          <Route index element={<Properties />} />
          <Route
            id="property"
            path=":propertyId"
            element={<Property />}
            loader={propertyLoader}
          >
            <Route
              index
              element={<PropertyIndex />}
              action={propertyIndexAction}
            />
            <Route
              path="edit"
              element={<PropertyEditBooking />}
              action={propertyEditBookingAction}
            >
              <Route
                path="delete"
                action={propertyDeleteBookingAction}
                loader={propertyDeleteBookingLoader}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    </>
  )
);
