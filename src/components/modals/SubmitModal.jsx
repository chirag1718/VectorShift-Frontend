import { CircleCheck, Loader, Play, AlertCircle, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useStore } from "../../stores/store";
import { Backend_Server_URL } from "../../config/urlConfig.js";
import { useState } from "react";

export const SubmitModal = () => {
    const { nodes, edges, isPipelineActive, setPipelineActive } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        setPipelineActive(true);
        setError(null);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("nodes", JSON.stringify(nodes));
            formData.append("edges", JSON.stringify(edges));

            const response = await fetch(
                `${Backend_Server_URL}/pipelines/parse`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError(`Network error: ${err.message}`);
        } finally {
            setIsLoading(false);
            setPipelineActive(false);
        }
    };

    const handleOpenChange = (open) => {
        if (!isPipelineActive || !open) {
            setIsOpen(open);
            if (!open) {
                // Reset state when modal closes
                setResult(null);
                setError(null);
                setPipelineActive(false);
            }
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className={`bg-slate-800 hover:bg-slate-700 ${
                        isPipelineActive && !isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                    onClick={(e) => {
                        if (isPipelineActive && !isLoading) {
                            e.preventDefault();
                            e.stopPropagation();
                        } else {
                            handleSubmit();
                        }
                    }}
                    disabled={isLoading || isPipelineActive}
                >
                    {isLoading ? (
                        <Loader className="size-4 animate-spin" />
                    ) : (
                        <Play className="size-4" />
                    )}
                    {isPipelineActive && !isLoading ? "Analyzing..." : "Run"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    {isLoading ? (
                        <>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <Loader className="h-5 w-5 animate-spin" />
                                Processing Pipeline
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Analyzing your pipeline structure and validating
                                the DAG...
                            </AlertDialogDescription>
                        </>
                    ) : error ? (
                        <>
                            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                <AlertCircle className="h-5 w-5" />
                                Error
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-red-600">
                                {error}
                            </AlertDialogDescription>
                        </>
                    ) : result ? (
                        <>
                            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
                                {result.is_dag ? (
                                    <CircleCheck className="h-5 w-5" />
                                ) : (
                                    <CircleX className="h-5 w-5 text-red-500" />
                                )}
                                Pipeline Analysis Results
                            </AlertDialogTitle>
                            <AlertDialogDescription className="space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Nodes:
                                        </span>
                                        <span className="text-blue-600 font-semibold">
                                            {result.num_nodes}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Edges:
                                        </span>
                                        <span className="text-blue-600 font-semibold">
                                            {result.num_edges}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            DAG Status:
                                        </span>
                                        <span
                                            className={`font-semibold ${
                                                result.is_dag
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {result.is_dag
                                                ? "Valid DAG"
                                                : "Not a DAG"}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {result.message ||
                                        (result.is_dag
                                            ? "Your pipeline is a valid Directed Acyclic Graph and can be executed."
                                            : "Your pipeline contains cycles and cannot be executed as a DAG.")}
                                </p>
                            </AlertDialogDescription>
                        </>
                    ) : (
                        <>
                            <AlertDialogTitle>
                                Analyze Pipeline
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Click "Run" to analyze your pipeline structure.
                                This will count the nodes and edges, and check
                                if your pipeline forms a valid DAG.
                            </AlertDialogDescription>
                        </>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {isLoading ? (
                        <AlertDialogAction disabled>
                            Processing...
                        </AlertDialogAction>
                    ) : error ? (
                        <AlertDialogAction onClick={() => setIsOpen(false)}>
                            Close
                        </AlertDialogAction>
                    ) : result ? (
                        <AlertDialogAction onClick={() => setIsOpen(false)}>
                            Close
                        </AlertDialogAction>
                    ) : (
                        <AlertDialogAction onClick={handleSubmit}>
                            Analyze Pipeline
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
