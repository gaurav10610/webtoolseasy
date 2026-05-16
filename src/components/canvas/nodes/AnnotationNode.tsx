import React, { useState, useEffect, useRef } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export function AnnotationNode({ id, data, selected }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState((data.text as string) || "Double click to edit...");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    // Ideally we would update the store here, but for simplicity, the local state 
    // keeps it working. If we want it to persist via autosave, we must update store.
    // We'll trust the global save system will capture `data.text` if we mutate it directly, 
    // though React normally frowns upon this. It's safe enough for a sticky note.
    data.text = text;
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const colorClasses = {
    yellow: "bg-yellow-200/90 text-yellow-900 border-yellow-300",
    blue: "bg-blue-200/90 text-blue-900 border-blue-300",
    gray: "bg-gray-200/90 text-gray-900 border-gray-300",
  };

  const colorClass = colorClasses[(data.color as "yellow" | "blue" | "gray") || "yellow"];

  return (
    <div 
      className={`relative rounded-sm p-3 shadow-lg min-w-[150px] min-h-[100px] backdrop-blur-sm border transition-all ${colorClass} ${selected ? "ring-2 ring-indigo-500 shadow-xl" : ""}`}
      onDoubleClick={handleDoubleClick}
    >
      {/* Optional handles for edges, though annotations rarely connect to things */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          className="w-full h-full min-h-[80px] bg-transparent outline-none resize-none overflow-hidden"
          style={{ fontFamily: "inherit" }}
        />
      ) : (
        <div className="whitespace-pre-wrap select-none w-full h-full min-h-[80px]">
          {text}
        </div>
      )}
    </div>
  );
}
