// textNode.js

import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data, onClose }) => {
    const [currText, setCurrText] = useState(data?.text || "{{input}}");
    const [detectedVariables, setDetectedVariables] = useState([]);
    const textareaRef = useRef(null);

    // Function to detect variables in text
    const detectVariables = (text) => {
        const variableRegex = /\{\{(\w+)\}\}/g;
        const matches = [];
        let match;

        while ((match = variableRegex.exec(text)) !== null) {
            const variableName = match[1];
            // Check if it's a valid JavaScript variable name
            if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variableName)) {
                matches.push(variableName);
            }
        }

        // Remove duplicates and return unique variables
        return [...new Set(matches)];
    };

    // Update detected variables when text changes
    useEffect(() => {
        const variables = detectVariables(currText);
        setDetectedVariables(variables);
    }, [currText]);

    // Auto-resize textarea
    const handleTextChange = (e) => {
        const newText = e.target.value;
        setCurrText(newText);

        // Auto-resize the textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
    };

    // Generate handles dynamically based on detected variables
    const generateHandles = () => {
        const handles = [
            {
                type: "source",
                position: Position.Right,
                id: `${id}-output`,
            },
        ];

        // Add target handles for each detected variable
        detectedVariables.forEach((variable, index) => {
            let topPosition;

            if (detectedVariables.length === 1) {
                // Single variable: center position
                topPosition = "50%";
            } else {
                // Multiple variables: distribute around center
                const totalVariables = detectedVariables.length;
                const spacing = 100 / totalVariables; // Space between handles
                const totalHeight = (totalVariables - 1) * spacing;
                const startPosition = 50 - totalHeight / 2; // Center the group
                topPosition = `${startPosition + index * spacing}%`;
            }

            handles.push({
                type: "target",
                position: Position.Left,
                id: `${id}-${variable}`,
                style: {
                    top: topPosition,
                },
            });
        });

        return handles;
    };

    return (
        <BaseNode
            id={id}
            title="Text"
            description="Add or modify text content with variables"
            handles={generateHandles()}
            onClose={onClose}
        >
            {/* Text field section with auto-resize */}
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <textarea
                    ref={textareaRef}
                    value={currText}
                    onChange={handleTextChange}
                    className="p-3 bg-transparent border-none text-sm text-purple-800 font-medium w-full outline-none resize-none min-h-5 max-h-48 overflow-y-auto font-inherit leading-relaxed"
                    placeholder="Enter text with variables like {{variableName}}"
                    rows={1}
                />
            </div>

            {/* Show detected variables */}
            {detectedVariables.length > 0 && (
                <div className="mt-3 p-2 bg-gray-50 rounded-md border border-gray-300">
                    <div className="text-xs text-gray-600 mb-1.5 font-medium">
                        <span>Detected Variables:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {detectedVariables.map((variable, index) => (
                            <span
                                key={variable}
                                className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium border border-blue-200"
                            >
                                {`{{${variable}}}`}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </BaseNode>
    );
};
