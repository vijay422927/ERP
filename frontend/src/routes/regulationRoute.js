import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import RegulationsPage from "../pages/regulations";

export const regulationRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/regulations",
  component: RegulationsPage,
});
