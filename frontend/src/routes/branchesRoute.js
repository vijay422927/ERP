import { createRoute } from "@tanstack/react-router";
import Branchespage from "../pages/branches";
import { rootRoute } from "./rootRoute";

export const branchRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/branches",
  component: Branchespage,
});
