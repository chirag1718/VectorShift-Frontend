import { useEffect } from "react";
import { Backend_Server_URL } from "./config/urlConfig.js";
import { PipelineToolbar } from "./components/Toolbar";
import { PipelineUI } from "./components/UI";

function App() {
    useEffect(() => {
        fetch(Backend_Server_URL)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="h-screen w-full p-2 bg-gray-200">
            <div className="h-full w-full border rounded-md border-gray-400 flex flex-col overflow-hidden">
                <PipelineToolbar />
                <div className="flex-1 min-h-0">
                    <PipelineUI />
                </div>
            </div>
        </div>
    );
}

export default App;
