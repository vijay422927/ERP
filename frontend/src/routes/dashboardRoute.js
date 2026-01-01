import {createRoute} from "@tanstack/react-router"
import { rootRoute } from "./rootRoute"
import DashboardPage from "../pages/dashboard"


export const dashboardRouter = createRoute({
    getParentRoute : ()=>rootRoute,
    path :"/dashboard",
    component : DashboardPage
})