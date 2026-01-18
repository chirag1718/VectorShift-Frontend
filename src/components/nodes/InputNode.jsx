// InputNode.jsx

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

export const InputNode = ({ id, data, onClose }) => {
    const [currName, setCurrName] = useState(
        data?.inputName || id.replace("customInput-", "input_")
    );
    const [inputType, setInputType] = useState(data.inputType || "Text");

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    // Define handles for the input node
    const handles = [
        {
            type: "source",
            position: Position.Right,
            id: `${id}-value`,
            style: {
                right: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
            },
        },
    ];

    return (
        <BaseNode
            id={id}
            title="Input"
            description="Define input parameters for your workflow"
            handles={handles}
            onClose={onClose}
        >
            <div className="space-y-4">
                {/* Input Name Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Input Name
                    </label>
                    <input
                        type="text"
                        value={currName}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="Enter input name"
                    />
                </div>

                {/* Input Type Field */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Input Type
                    </label>
                    <Select value={inputType} onValueChange={setInputType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select input type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Text">Text</SelectItem>
                            <SelectItem value="File">File</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </BaseNode>
    );
};
