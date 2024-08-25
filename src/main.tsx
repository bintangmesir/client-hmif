import "./index.css";
import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./context/theme-provider";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { useAuthUserContext } from "./context/auth-provider";
import { router } from "./router";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const accents = {
  zinc: "/styles/zinc.css",
  slate: "/styles/slate.css",
  stone: "/styles/stone.css",
  gray: "/styles/gray.css",
  neutral: "/styles/neutral.css",
  red: "/styles/red.css",
  rose: "/styles/rose.css",
  orange: "/styles/orange.css",
  green: "/styles/green.css",
  blue: "/styles/blue.css",
  yellow: "/styles/yellow.css",
  violet: "/styles/violet.css",
};

function App() {
  const auth = useAuthUserContext();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ThemeSwitcherProvider defaultTheme="green" themeMap={accents}>
        <RouterProvider router={router} context={{ auth }} />
      </ThemeSwitcherProvider>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
