import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import ProgramsPage from "../pages/programs";

export const programsRouter = createRoute({
  getParentRoute: () => rootRoute,
  component: ProgramsPage,
  path: "/programs",
});
