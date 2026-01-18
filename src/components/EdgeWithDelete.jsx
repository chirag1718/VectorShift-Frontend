import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";
import { XCircle } from "lucide-react";
import { useStore } from "../stores/store";

const EdgeWithDelete = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style = {},
}) => {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 8,
        offset: 8,
    });

    const { setEdges } = useStore((state) => ({
        setEdges: state.setEdges,
    }));

    const handleDeleteEdge = (e) => {
        e.stopPropagation();
        setEdges((eds) => eds.filter((edge) => edge.id !== id));
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: "all",
                    }}
                >
                    <div
                        className="bg-white rounded-full p-[2px] cursor-pointer shadow-sm border border-gray-200 hover:border-red-300 transition-colors duration-200"
                        onClick={handleDeleteEdge}
                    >
                        <XCircle className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors duration-200" />
                    </div>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default EdgeWithDelete;
