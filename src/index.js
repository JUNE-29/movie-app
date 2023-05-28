import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import MovieCategories from "./pages/MovieCategories";
import Search from "./pages/Search";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: "/movies", element: <Home /> },
            { path: "/movies/:category", element: <MovieCategories /> },
            { path: "/movies/detail/:movieId", element: <MovieDetail /> },
            { path: "movies/search/:keyword", element: <Search /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
