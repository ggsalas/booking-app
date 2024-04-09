import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import Properties, { loader as PropertiesLoader } from "./routes/properties";
import Property, { loader as PropertyLoader } from "./routes/property";
import Layout from "./components/Layout";
import PropertyIndex, {
  action as PropertyIndexAction,
} from "./routes/property-index";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}></Route>
      <Route errorElement={<ErrorPage />}>
        <Route path="properties" element={<Layout />}>
          <Route index element={<Properties />} loader={PropertiesLoader} />

          <Route
            id="property"
            path=":propertyId"
            element={<Property />}
            loader={PropertyLoader}
          >
            <Route
              index
              element={<PropertyIndex />}
              action={PropertyIndexAction}
            />
            <Route path="edit" element={<div>Property edit</div>} />
          </Route>
        </Route>
      </Route>
    </>
  )
);
