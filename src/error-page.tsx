import { ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse & Error
  console.error(error);

  return (
    <div id="error-page">
      <h1>Error</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
