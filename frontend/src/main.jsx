import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routerTree } from "./routes/rootRoute";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const router = createRouter({ routeTree: routerTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
