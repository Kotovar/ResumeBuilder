import type { KeyboardEvent } from "react";
import { useT } from "@i18n/useT";

interface Props {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
    tip?: string;
}

export function BulletList({
    label,
    items,
    onChange,
    placeholder = "Describe your impact...",
    tip,
}: Props) {
    const t = useT();
    const updateItem = (i: number, value: string) => {
        const next = [...items];
        next[i] = value;
        onChange(next);
    };

    const addItem = (afterIndex?: number) => {
        const next = [...items];
        next.splice(
            afterIndex !== undefined ? afterIndex + 1 : next.length,
            0,
            "",
        );
        onChange(next);
    };

    const removeItem = (i: number) => {
        if (items.length === 1) {
            onChange([""]);
        } else {
            onChange(items.filter((_, idx) => idx !== i));
        }
    };

    const handleKey = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem(i);

            requestAnimationFrame(() => {
                const inputs = document.querySelectorAll<HTMLInputElement>(
                    `[data-bullet="${label}"] input`,
                );
                inputs[i + 1]?.focus();
            });
        } else if (
            e.key === "Backspace" &&
            items[i] === "" &&
            items.length > 1
        ) {
            e.preventDefault();
            removeItem(i);
            requestAnimationFrame(() => {
                const inputs = document.querySelectorAll<HTMLInputElement>(
                    `[data-bullet="${label}"] input`,
                );
                inputs[Math.max(0, i - 1)]?.focus();
            });
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {label}
                </label>
                {tip && (
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        {tip}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1.5" data-bullet={label}>
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm select-none flex-none">
                            •
                        </span>
                        <input
                            value={item}
                            onChange={(e) => updateItem(i, e.target.value)}
                            onKeyDown={(e) => handleKey(e, i)}
                            placeholder={placeholder}
                            className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-md bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                placeholder:text-gray-300 transition-colors"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="cursor-pointer w-6 h-6 flex items-center justify-center text-gray-300
                hover:text-red-400 flex-none rounded transition-colors text-lg leading-none"
                            title="Remove"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={() => addItem()}
                className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 text-left pl-5 transition-colors"
            >
                {t.ui.addBullet}
            </button>
        </div>
    );
}
