// DataProcessingNode.jsx

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

export const DataProcessingNode = ({ id, data, onClose }) => {
    const [operation, setOperation] = useState(data?.operation || "transform");
    const [script, setScript] = useState(data?.script || "");
    const [outputFormat, setOutputFormat] = useState(
        data?.outputFormat || "json"
    );

    const handleScriptChange = (e) => {
        setScript(e.target.value);
    };

    const handles = [
        {
            type: "target",
            position: Position.Left,
            id: `${id}-input`,
            style: { top: "50%" },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-output`,
            style: { top: "50%" },
        },
    ];

    const getOperationDescription = () => {
        switch (operation) {
            case "transform":
                return "Transform data structure or format";
            case "filter":
                return "Filter data based on conditions";
            case "map":
                return "Apply function to each item";
            case "reduce":
                return "Aggregate data into single value";
            case "sort":
                return "Sort data by specified criteria";
            case "group":
                return "Group data by key";
            default:
                return "Process and manipulate data";
        }
    };

    const getScriptPlaceholder = () => {
        switch (operation) {
            case "transform":
                return "// Transform input data\nreturn {\n  processed: input.data,\n  timestamp: new Date().toISOString()\n};";
            case "filter":
                return "// Filter condition\nreturn input.value > 10;";
            case "map":
                return "// Map function\nreturn input * 2;";
            case "reduce":
                return "// Reduce function\nreturn accumulator + input.value;";
            case "sort":
                return "// Sort by property\nreturn input.sort((a, b) => a.value - b.value);";
            case "group":
                return "// Group by key\nreturn input.groupBy('category');";
            default:
                return "// Your processing logic here\nreturn input;";
        }
    };

    return (
        <BaseNode
            id={id}
            title="Data Processing"
            description={getOperationDescription()}
            handles={handles}
            onClose={onClose}
        >
            <div className="space-y-4">
                {/* Operation Type */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Operation
                    </label>
                    <Select value={operation} onValueChange={setOperation}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select operation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="transform">Transform</SelectItem>
                            <SelectItem value="filter">Filter</SelectItem>
                            <SelectItem value="map">Map</SelectItem>
                            <SelectItem value="reduce">Reduce</SelectItem>
                            <SelectItem value="sort">Sort</SelectItem>
                            <SelectItem value="group">Group</SelectItem>
                            <SelectItem value="custom">
                                Custom Script
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Processing Script */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Processing Script
                    </label>
                    <textarea
                        value={script}
                        onChange={handleScriptChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-mono resize-none"
                        rows="6"
                        placeholder={getScriptPlaceholder()}
                    />
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Output Format
                    </label>
                    <Select
                        value={outputFormat}
                        onValueChange={setOutputFormat}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select output format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="array">Array</SelectItem>
                            <SelectItem value="string">String</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Info */}
                <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-xs text-blue-700">
                        <strong>Available variables:</strong> input, index,
                        accumulator (for reduce)
                    </p>
                </div>
            </div>
        </BaseNode>
    );
};
