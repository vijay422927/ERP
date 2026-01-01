import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import FacultyPage from "../pages/faculty";

export const facultyRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faculty",
  component :FacultyPage
});
