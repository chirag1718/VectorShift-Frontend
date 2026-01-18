// outputNode.js

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

export const OutputNode = ({ id, data, onClose }) => {
    const [currName, setCurrName] = useState(
        data?.outputName || id.replace("customOutput-", "output_")
    );
    const [outputType, setOutputType] = useState(data.outputType || "Text");

    const handleNameChange = (e) => {
        setCurrName(e.target.value);
    };

    const handles = [
        {
            type: "target",
            position: Position.Left,
            id: `${id}-value`,
        },
    ];

    return (
        <BaseNode
            id={id}
            title="Output"
            description="Display the results of your workflow"
            handles={handles}
            onClose={onClose}
        >
            {/* Output field section */}
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <input
                    type="text"
                    value={currName}
                    onChange={handleNameChange}
                    className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none"
                />
            </div>

            {/* Type selection section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-800 font-medium">
                    <span>Type</span>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white cursor-help">
                        ?
                    </div>
                </div>
                <button className="bg-purple-200 text-purple-600 border-none px-2 py-1 rounded text-xs font-medium cursor-pointer self-end transition-colors duration-200 hover:bg-purple-300">
                    Dropdown
                </button>
                <Select value={outputType} onValueChange={setOutputType}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select output type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="File">Image</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </BaseNode>
    );
};
