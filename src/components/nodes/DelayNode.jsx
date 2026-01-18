// DelayNode.jsx

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

export const DelayNode = ({ id, data, onClose }) => {
    const [delayType, setDelayType] = useState(data?.delayType || "fixed");
    const [delayValue, setDelayValue] = useState(data?.delayValue || 1000);
    const [delayUnit, setDelayUnit] = useState(
        data?.delayUnit || "milliseconds"
    );

    const handleDelayValueChange = (e) => {
        setDelayValue(e.target.value);
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

    const getDelayDescription = () => {
        if (delayType === "fixed") {
            return `Wait for ${delayValue} ${delayUnit}`;
        } else if (delayType === "random") {
            return `Wait for random time between 0-${delayValue} ${delayUnit}`;
        } else if (delayType === "condition") {
            return "Wait until condition is met";
        }
        return "Add delay to workflow execution";
    };

    return (
        <BaseNode
            id={id}
            title="Delay"
            description={getDelayDescription()}
            handles={handles}
            onClose={onClose}
        >
            <div className="space-y-4">
                {/* Delay Type */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Delay Type
                    </label>
                    <Select value={delayType} onValueChange={setDelayType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select delay type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fixed">Fixed Delay</SelectItem>
                            <SelectItem value="random">Random Delay</SelectItem>
                            <SelectItem value="condition">
                                Conditional Wait
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Delay Value */}
                {delayType !== "condition" && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            {delayType === "random"
                                ? "Maximum Delay"
                                : "Delay Value"}
                        </label>
                        <input
                            type="number"
                            value={delayValue}
                            onChange={handleDelayValueChange}
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
                    </div>
                )}

                {/* Delay Unit */}
                {delayType !== "condition" && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Time Unit
                        </label>
                        <Select value={delayUnit} onValueChange={setDelayUnit}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select time unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="milliseconds">
                                    Milliseconds
                                </SelectItem>
                                <SelectItem value="seconds">Seconds</SelectItem>
                                <SelectItem value="minutes">Minutes</SelectItem>
                                <SelectItem value="hours">Hours</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Condition Input */}
                {delayType === "condition" && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Wait Condition
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                            placeholder="e.g., {{status}} === 'ready'"
                        />
                    </div>
                )}

                {/* Info */}
                <div className="p-2 bg-yellow-50 rounded-md border border-yellow-200">
                    <p className="text-xs text-yellow-700">
                        <strong>Note:</strong> This will pause workflow
                        execution for the specified duration.
                    </p>
                </div>
            </div>
        </BaseNode>
    );
};
