// BaseNode.js

import { useState } from "react";
import { Handle } from "reactflow";
import { X, Maximize2, Minimize2 } from "lucide-react";

// Input icon component
const InputIcon = () => (
    <svg
        className="w-5 h-5 text-gray-800 mt-0.5 transition-colors duration-200 group-hover:text-purple-600"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zm4-11H3C1.9 2 1 2.9 1 4v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM3 20V4h18v16H3z" />
        <path d="M7 9h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2z" />
    </svg>
);

export const BaseNode = ({
    id,
    title,
    description,
    children,
    handles = [],
    className = "",
    style = {},
    onClose,
    expandable = true,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleClose = () => {
        if (onClose) {
            onClose(id);
        }
    };

    const handleExpand = () => {
        if (expandable) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 w-80 h-fit p-3 border border-gray-300 bg-white rounded-lg shadow-lg relative transition-all duration-200 group hover:border-purple-400 hover:shadow-purple-200 hover:shadow-lg cursor-grab ${className}`}
            style={style}
        >
            {/* Render all handles */}
            {handles.map((handle, index) => (
                <Handle
                    key={index}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id}
                    style={{
                        width: "12px",
                        height: "12px",
                        border: "2px solid #a0a0d0",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        zIndex: 999,
                        opacity: 1,
                        ...handle.style,
                    }}
                />
            ))}

            {/* Header section */}
            <div className="h-fit w-full">
                <div className="h-full w-full border rounded-md p-2 group-hover:bg-purple-50 group-hover:border-purple-400 transition-all duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                            <InputIcon />
                            <h3 className="text-base font-semibold text-gray-800 m-0 transition-colors duration-200 group-hover:text-purple-600">
                                {title}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            {expandable && (
                                <button
                                    onClick={handleExpand}
                                    className="p-0.5 rounded hover:bg-gray-100 transition-colors duration-200"
                                    title={isExpanded ? "Collapse" : "Expand"}
                                >
                                    {isExpanded ? (
                                        <Minimize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                    ) : (
                                        <Maximize2 className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                    )}
                                </button>
                            )}
                            <X
                                className="w-4 h-4 text-gray-500 cursor-pointer transition-colors duration-200 hover:text-gray-700"
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                    {description && (
                        <p className="text-xs text-gray-600 m-0 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {/* Content section */}
            {isExpanded && (
                <div className="flex flex-col gap-4 w-full transition-all duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};
