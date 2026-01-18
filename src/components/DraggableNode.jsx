export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = "grabbing";
        event.dataTransfer.setData(
            "application/reactflow",
            JSON.stringify(appData)
        );
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div
            className={`h-auto w-fit flex items-center justify-center px-3 py-1 text-sm rounded-md bg-slate-800 cursor-grab hover:bg-slate-700 transition-colors duration-300 ${type}`}
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = "grab")}
            draggable
            title={label}
            aria-label={label}
        >
            <span className="text-white">{label}</span>
        </div>
    );
};
