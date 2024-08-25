import { QueryClient, QueryClientProvider } from "react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useAuthUserContext } from "@/context/auth-provider";

interface AuthRouterContext {
  auth: ReturnType<typeof useAuthUserContext>;
}

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<AuthRouterContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});
