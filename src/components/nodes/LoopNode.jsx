// LoopNode.jsx

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export const LoopNode = ({ id, data, onClose }) => {
    const [loopType, setLoopType] = useState(data?.loopType || "for");
    const [maxIterations, setMaxIterations] = useState(
        data?.maxIterations || 10
    );
    const [condition, setCondition] = useState(data?.condition || "");

    const handleMaxIterationsChange = (e) => {
        setMaxIterations(e.target.value);
    };

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
    };

    const handles = [
        {
            type: "target",
            position: Position.Left,
            id: `${id}-input`,
            style: { top: "30%" },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-output`,
            style: { top: "50%" },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-break`,
            style: { top: "70%" },
        },
    ];

    return (
        <BaseNode
            id={id}
            title="Loop"
            description="Repeat operations with conditions"
            handles={handles}
            onClose={onClose}
        >
            {/* Loop Type */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-800 font-medium">
                    <span>Loop Type</span>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white cursor-help">
                        ?
                    </div>
                </div>
                <button className="bg-purple-200 text-purple-600 border-none px-2 py-1 rounded text-xs font-medium cursor-pointer self-end transition-colors duration-200 hover:bg-purple-300">
                    Dropdown
                </button>
                <Select value={loopType} onValueChange={setLoopType}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select loop type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="for">For Loop (Count)</SelectItem>
                        <SelectItem value="while">
                            While Loop (Condition)
                        </SelectItem>
                        <SelectItem value="foreach">
                            For Each (Array)
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Max Iterations (for for loops) */}
            {loopType === "for" && (
                <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                    <input
                        type="number"
                        value={maxIterations}
                        onChange={handleMaxIterationsChange}
                        min="1"
                        max="1000"
                        className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none"
                        placeholder="Max iterations"
                    />
                </div>
            )}

            {/* Condition (for while loops) */}
            {loopType === "while" && (
                <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                    <input
                        type="text"
                        value={condition}
                        onChange={handleConditionChange}
                        className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none"
                        placeholder="e.g., {{counter}} < 100"
                    />
                </div>
            )}

            {/* Output Labels */}
            <div className="flex justify-between text-xs text-gray-600">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Continue
                </span>
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Break
                </span>
            </div>
        </BaseNode>
    );
};
