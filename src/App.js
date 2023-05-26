import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <Header />
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </>
    );
}

export default App;
