import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../stores/store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/InputNode";
import { LLMNode } from "./nodes/LLMNode";
import { OutputNode } from "./nodes/OutputNode";
import { TextNode } from "./nodes/TextNode";
import { ConditionalNode } from "./nodes/ConditionalNode";
import { LoopNode } from "./nodes/LoopNode";
import { APINode } from "./nodes/APINode";
import { DataProcessingNode } from "./nodes/DataProcessingNode";
import { DelayNode } from "./nodes/DelayNode";
import { FileNode } from "./nodes/FileNode";
import EdgeWithDelete from "./EdgeWithDelete";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Base node components
const baseNodeTypes = {
    customInput: InputNode,
    llm: LLMNode,
    customOutput: OutputNode,
    text: TextNode,
    conditional: ConditionalNode,
    loop: LoopNode,
    api: APINode,
    dataProcessing: DataProcessingNode,
    delay: DelayNode,
    file: FileNode,
};

// Node wrapper to pass onClose handler
const NodeWrapper = ({ nodeType, ...props }) => {
    const { removeNode } = useStore();

    const handleClose = (nodeId) => {
        removeNode(nodeId);
    };

    const NodeComponent = baseNodeTypes[nodeType];
    return <NodeComponent {...props} onClose={handleClose} />;
};

const nodeTypes = {
    customInput: (props) => <NodeWrapper nodeType="customInput" {...props} />,
    llm: (props) => <NodeWrapper nodeType="llm" {...props} />,
    customOutput: (props) => <NodeWrapper nodeType="customOutput" {...props} />,
    text: (props) => <NodeWrapper nodeType="text" {...props} />,
    conditional: (props) => <NodeWrapper nodeType="conditional" {...props} />,
    loop: (props) => <NodeWrapper nodeType="loop" {...props} />,
    api: (props) => <NodeWrapper nodeType="api" {...props} />,
    dataProcessing: (props) => (
        <NodeWrapper nodeType="dataProcessing" {...props} />
    ),
    delay: (props) => <NodeWrapper nodeType="delay" {...props} />,
    file: (props) => <NodeWrapper nodeType="file" {...props} />,
};

const edgeTypes = {
    edgeWithDelete: EdgeWithDelete,
};

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    getNodeID: state.getNodeID,
    addNode: state.addNode,
    removeNode: state.removeNode,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
        nodes,
        edges,
        getNodeID,
        addNode,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}` };
        return nodeData;
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData("application/reactflow")) {
                const appData = JSON.parse(
                    event.dataTransfer.getData("application/reactflow")
                );
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === "undefined" || !type) {
                    return;
                }

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                addNode(newNode);
            }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    return (
        <div ref={reactFlowWrapper} className="h-full w-full bg-gray-50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType="smoothstep"
                fitView
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};
