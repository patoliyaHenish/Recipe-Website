import { createBrowserRouter } from "react-router-dom";
import React from "react";
import MainLayout from "../layout/MainLayout";
import Auth from "../pages/Auth";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import MyProfile from "../pages/users/MyProfile";
import UserNotAuthentiCated from "../components/UserNotAuthentiCated";
import RecipeCategory from "../pages/admin/category management/RecipeCategory";
import RecipeSubCategory from "../pages/admin/sub-category/RecipeSubCategory";
import Recipe from "../pages/admin/recipe management/Recipe";
import BannerManagement from '../pages/admin/banner management/BannerManagement'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "*",
                element: <Error404 />
            },
            {
                path: "not-authenticated",
                element: <UserNotAuthentiCated />
            },
            {
                path: "",
                element: <Home />
            },
            {
                path: "auth",
                element: <Auth />
            },
            {
                path: "reset-password/:email/:token",
                element: <ResetPassword />
            },
            {
                path: "my-profile",
                element: (
                    <ProtectedRoute allowedRoles={["user", "admin"]}>
                        <MyProfile/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/admin/manage-recipe-category",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <RecipeCategory />
                    </ProtectedRoute>
                )
            },
            {
                path: "/admin/manage-recipe-subcategories",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <RecipeSubCategory/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/admin/manage-recipes",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Recipe/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/admin/manage-banners",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <BannerManagement />
                    </ProtectedRoute>
                )
            }
        ]
    }
])

