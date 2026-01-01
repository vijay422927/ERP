import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { CoursePage } from "../pages/Courser";


export const courseRouter = createRoute({
    getParentRoute :()=> rootRoute,
    path :"/courses",
    component : CoursePage
})