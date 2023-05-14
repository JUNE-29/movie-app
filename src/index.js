import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Movies /> },
            { path: "/movies", element: <Movies /> },
            { path: "/movies/:category", element: <Movies /> },
            { path: "/movies/detail/:movieId", element: <MovieDetail /> },
            { path: "movies/search/:keyword", element: <Movies /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
