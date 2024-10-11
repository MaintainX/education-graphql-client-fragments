import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";

export function Root() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => <PageError error={error} />}
      >
        <Suspense fallback={<PageSpinner />}>
          <Nav />
          <Suspense fallback={<PageSpinner />}>
            <Outlet />
          </Suspense>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
