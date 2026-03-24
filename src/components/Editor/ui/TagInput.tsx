import { useState, type KeyboardEvent } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    label: string;
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    sortable?: boolean;
}

interface SortableTagProps {
    id: string;
    tag: string;
    onRemove: () => void;
}

function SortableTag({ id, tag, onRemove }: SortableTagProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    return (
        <span
            ref={setNodeRef}
            style={{
                background: "color-mix(in srgb, var(--accent) 12%, white)",
                color: "var(--accent)",
                transform: CSS.Transform.toString(transform),
                transition,
                opacity: isDragging ? 0.4 : 1,
                zIndex: isDragging ? 10 : undefined,
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium
        rounded-full select-none touch-none"
        >
            {/* drag handle — grip dots */}
            <span
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing opacity-30 hover:opacity-70
          transition-opacity leading-none"
                title="Drag to reorder"
            >
                ⠿
            </span>
            {tag}
            <button
                type="button"
                onClick={onRemove}
                className="opacity-60 hover:opacity-100 leading-none font-bold transition-opacity"
            >
                ×
            </button>
        </span>
    );
}

export function TagInput({
    label,
    tags,
    onChange,
    placeholder = "Type and press Enter...",
    sortable = false,
}: Props) {
    const [input, setInput] = useState("");

    // Stable IDs: tag value + index to handle duplicate tag names safely
    const itemIds = tags.map((t, i) => `${t}__${i}`);

    const commit = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
        }
        setInput("");
    };

    const remove = (i: number) => onChange(tags.filter((_, idx) => idx !== i));

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
        } else if (e.key === "Backspace" && !input && tags.length > 0) {
            remove(tags.length - 1);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Require a 4px move before drag starts so click-to-remove still works
            activationConstraint: { distance: 4 },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const from = itemIds.indexOf(active.id as string);
        const to = itemIds.indexOf(over.id as string);
        if (from !== -1 && to !== -1) {
            onChange(arrayMove(tags, from, to));
        }
    };

    const tagList = (
        <>
            {tags.map((tag, i) =>
                sortable ? (
                    <SortableTag
                        key={itemIds[i]}
                        id={itemIds[i]}
                        tag={tag}
                        onRemove={() => remove(i)}
                    />
                ) : (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium
              rounded-full select-none"
                        style={{
                            background:
                                "color-mix(in srgb, var(--accent) 12%, white)",
                            color: "var(--accent)",
                        }}
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="opacity-60 hover:opacity-100 leading-none font-bold transition-opacity"
                        >
                            ×
                        </button>
                    </span>
                ),
            )}
        </>
    );

    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
            </label>
            <div
                className="flex flex-wrap gap-1.5 p-2 `min-h-10.5 border border-gray-200 rounded-md
          bg-white focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400
          transition-colors cursor-text"
            >
                {sortable ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={itemIds}
                            strategy={horizontalListSortingStrategy}
                        >
                            {tagList}
                        </SortableContext>
                    </DndContext>
                ) : (
                    tagList
                )}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    onBlur={commit}
                    placeholder={tags.length === 0 ? placeholder : ""}
                    className="flex-1 min-w-25 text-sm outline-none bg-transparent
            placeholder:text-gray-300"
                />
            </div>
        </div>
    );
}
