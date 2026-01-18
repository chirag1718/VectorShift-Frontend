// APINode.jsx

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

export const APINode = ({ id, data, onClose }) => {
    const [url, setUrl] = useState(data?.url || "");
    const [method, setMethod] = useState(data?.method || "GET");
    const [headers, setHeaders] = useState(data?.headers || "");
    const [body, setBody] = useState(data?.body || "");

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleHeadersChange = (e) => {
        setHeaders(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
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
            id: `${id}-response`,
            style: { top: "40%" },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-error`,
            style: { top: "60%" },
        },
    ];

    return (
        <BaseNode
            id={id}
            title="API Call"
            description="Make HTTP requests to external APIs"
            handles={handles}
            onClose={onClose}
        >
            {/* URL */}
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <input
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none"
                    placeholder="https://api.example.com/endpoint"
                />
            </div>

            {/* Method */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-800 font-medium">
                    <span>Method</span>
                    <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-xs text-white cursor-help">
                        ?
                    </div>
                </div>
                <button className="bg-purple-200 text-purple-600 border-none px-2 py-1 rounded text-xs font-medium cursor-pointer self-end transition-colors duration-200 hover:bg-purple-300">
                    Dropdown
                </button>
                <Select value={method} onValueChange={setMethod}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select HTTP method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="PATCH">PATCH</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Headers */}
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <textarea
                    value={headers}
                    onChange={handleHeadersChange}
                    className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none resize-none"
                    rows="3"
                    placeholder='{"Content-Type": "application/json", "Authorization": "Bearer {{token}}"}'
                />
            </div>

            {/* Body (for POST, PUT, PATCH) */}
            {(method === "POST" || method === "PUT" || method === "PATCH") && (
                <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                    <textarea
                        value={body}
                        onChange={handleBodyChange}
                        className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none resize-none"
                        rows="4"
                        placeholder='{"key": "value", "data": "{{input}}"}'
                    />
                </div>
            )}

            {/* Output Labels */}
            <div className="flex justify-between text-xs text-gray-600">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    Success
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                    Error
                </span>
            </div>
        </BaseNode>
    );
};
