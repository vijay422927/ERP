import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routerTree } from "./routes/rootRoute";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const router = createRouter({ routeTree: routerTree });
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
