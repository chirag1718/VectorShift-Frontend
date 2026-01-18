import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data, onClose }) => {
    const handles = [
        {
            type: "target",
            position: Position.Left,
            id: `${id}-system`,
            style: { top: `${100 / 3}%` },
        },
        {
            type: "target",
            position: Position.Left,
            id: `${id}-prompt`,
            style: { top: `${200 / 3}%` },
        },
        {
            type: "source",
            position: Position.Right,
            id: `${id}-response`,
        },
    ];

    return (
        <BaseNode
            id={id}
            title="LLM"
            description="Process text with a language model"
            handles={handles}
            onClose={onClose}
        >
            <div className="relative bg-purple-50 rounded-md overflow-hidden p-0.5 border border-transparent transition-all duration-200 focus-within:border-purple-400 focus-within:shadow-purple-100 focus-within:shadow-sm">
                <span className="p-3 text-sm text-purple-800 font-medium">
                    LLM Configuration
                </span>
            </div>
        </BaseNode>
    );
};
