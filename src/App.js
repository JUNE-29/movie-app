import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTopBtn from "./components/ScrollToTopBtn";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <div className="relative w-full m-auto p-4">
                <Header />
                <ScrollToTopBtn />
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            </div>
        </>
    );
}

export default App;
