import { DraggableNode } from "./DraggableNode";
import { SubmitButton } from "./Submit";
import { ClearAllModal } from "./modals/ClearAllModal";
export const PipelineToolbar = () => {
    return (
        <div className="h-14 w-full bg-white border-b border-gray-400 flex items-center justify-between gap-3 px-4 py-2 flex-shrink-0">
            <div className="flex items-center gap-4 h-full min-w-0 flex-1">
                <div className="h-fit w-fit flex items-center justify-center px-2 py-1 rounded font-bold text-sm bg-[#6366f1] text-white flex-shrink-0">
                    VS
                </div>
                <div className="h-full w-px bg-gray-300 flex-shrink-0" />
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide min-w-0 flex-1">
                    <DraggableNode type="customInput" label="Input" />
                    <DraggableNode type="llm" label="LLM" />
                    <DraggableNode type="customOutput" label="Output" />
                    <DraggableNode type="text" label="Text" />
                    <DraggableNode type="conditional" label="Conditional" />
                    <DraggableNode type="loop" label="Loop" />
                    <DraggableNode type="api" label="API" />
                    <DraggableNode type="dataProcessing" label="Data" />
                    <DraggableNode type="delay" label="Delay" />
                    <DraggableNode type="file" label="File" />
                </div>
            </div>
            <div className="flex items-center justify-center gap-1 flex-shrink-0">
                <ClearAllModal />
                <div className="h-full w-px bg-gray-300" />
                <SubmitButton />
            </div>
        </div>
    );
};
