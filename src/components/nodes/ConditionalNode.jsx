// ConditionalNode.jsx

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

export const ConditionalNode = ({ id, data, onClose }) => {
    const [condition, setCondition] = useState(data?.condition || "");
    const [operator, setOperator] = useState(data?.operator || "equals");

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
            id: `${id}-true`,
            style: { top: "25%" },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-false`,
            style: { top: "75%" },
        },
    ];

    return (
        <BaseNode
            id={id}
            title="Conditional"
            description="Branch workflow based on conditions"
            handles={handles}
            onClose={onClose}
        >
            {/* Condition Input */}
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <input
                    type="text"
                    value={condition}
                    onChange={handleConditionChange}
                    className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none"
                    placeholder="e.g., {{input}} > 10"
                />
            </div>

            {/* Operator Selection */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-800 font-medium">
                    <span>Operator</span>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white cursor-help">
                        ?
                    </div>
                </div>
                <button className="bg-purple-200 text-purple-600 border-none px-2 py-1 rounded text-xs font-medium cursor-pointer self-end transition-colors duration-200 hover:bg-purple-300">
                    Dropdown
                </button>
                <Select value={operator} onValueChange={setOperator}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="equals">Equals (==)</SelectItem>
                        <SelectItem value="not_equals">
                            Not Equals (!=)
                        </SelectItem>
                        <SelectItem value="greater">
                            Greater Than (&gt;)
                        </SelectItem>
                        <SelectItem value="less">Less Than (&lt;)</SelectItem>
                        <SelectItem value="greater_equal">
                            Greater or Equal (&gt;=)
                        </SelectItem>
                        <SelectItem value="less_equal">
                            Less or Equal (&lt;=)
                        </SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="not_contains">
                            Not Contains
                        </SelectItem>
                        <SelectItem value="empty">Is Empty</SelectItem>
                        <SelectItem value="not_empty">Is Not Empty</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Output Labels */}
            <div className="flex justify-between text-xs text-gray-600">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    True
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                    False
                </span>
            </div>
        </BaseNode>
    );
};
