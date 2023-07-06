import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTopBtn from "./components/ScrollToTopBtn";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <ScrollToTopBtn />
            <div className="w-full max-w-[1308px] m-0 m-auto">
                <Header />
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            </div>
        </>
    );
}

export default App;
