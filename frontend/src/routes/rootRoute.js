import { createRootRoute } from "@tanstack/react-router";
import rootLayout from "../App";
import { loginRouter } from "./loginRoute";
import { dashboardRouter } from "./dashboardRoute";
import { regulationRouter } from "./regulationRoute";
import { branchRouter } from "./branchesRoute";
import { programsRouter } from "./programsRoute";
import { facultyRouter } from "./facultyRoute";
import { courseRouter } from "./courseRouter";
export const rootRoute = createRootRoute({
  component: rootLayout,
});

export const routerTree = rootRoute.addChildren([
  loginRouter,
  dashboardRouter,
  regulationRouter,
  branchRouter,
  programsRouter,
  facultyRouter,
  courseRouter,
]);
