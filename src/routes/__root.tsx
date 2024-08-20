import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools />
      {/* <TanStackRouterDevtools /> */}
    </QueryClientProvider>
  ),
});
