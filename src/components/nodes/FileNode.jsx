// FileNode.jsx

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

export const FileNode = ({ id, data, onClose }) => {
    const [operation, setOperation] = useState(data?.operation || "read");
    const [filePath, setFilePath] = useState(data?.filePath || "");
    const [fileFormat, setFileFormat] = useState(data?.fileFormat || "text");
    const [encoding, setEncoding] = useState(data?.encoding || "utf-8");

    const handleFilePathChange = (e) => {
        setFilePath(e.target.value);
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
            case "read":
                return "Read content from a file";
            case "write":
                return "Write content to a file";
            case "append":
                return "Append content to a file";
            case "delete":
                return "Delete a file";
            case "copy":
                return "Copy a file to another location";
            case "move":
                return "Move a file to another location";
            default:
                return "Perform file operations";
        }
    };

    return (
        <BaseNode
            id={id}
            title="File Operation"
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
                            <SelectItem value="read">Read File</SelectItem>
                            <SelectItem value="write">Write File</SelectItem>
                            <SelectItem value="append">
                                Append to File
                            </SelectItem>
                            <SelectItem value="delete">Delete File</SelectItem>
                            <SelectItem value="copy">Copy File</SelectItem>
                            <SelectItem value="move">Move File</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* File Path */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        File Path
                    </label>
                    <input
                        type="text"
                        value={filePath}
                        onChange={handleFilePathChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="/path/to/file.txt or {{filePath}}"
                    />
                </div>

                {/* File Format (for read/write operations) */}
                {(operation === "read" ||
                    operation === "write" ||
                    operation === "append") && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            File Format
                        </label>
                        <Select
                            value={fileFormat}
                            onValueChange={setFileFormat}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select file format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="xml">XML</SelectItem>
                                <SelectItem value="yaml">YAML</SelectItem>
                                <SelectItem value="binary">Binary</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Encoding (for text files) */}
                {(operation === "read" ||
                    operation === "write" ||
                    operation === "append") &&
                    fileFormat === "text" && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Encoding
                            </label>
                            <Select
                                value={encoding}
                                onValueChange={setEncoding}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select encoding" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utf-8">UTF-8</SelectItem>
                                    <SelectItem value="ascii">ASCII</SelectItem>
                                    <SelectItem value="latin1">
                                        Latin-1
                                    </SelectItem>
                                    <SelectItem value="base64">
                                        Base64
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                {/* Destination Path (for copy/move operations) */}
                {(operation === "copy" || operation === "move") && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Destination Path
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                            placeholder="/path/to/destination/file.txt"
                        />
                    </div>
                )}

                {/* Info */}
                <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-xs text-blue-700">
                        <strong>Note:</strong> File paths can use variables like{" "}
                        <code>{"{input}"}</code> for dynamic paths.
                    </p>
                </div>
            </div>
        </BaseNode>
    );
};
