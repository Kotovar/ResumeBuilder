import { useState, type KeyboardEvent } from 'react';

interface Props {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({
  label,
  tags,
  onChange,
  placeholder = 'Type and press Enter...',
}: Props) {
  const [input, setInput] = useState('');

  const commit = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
  };

  const remove = (i: number) => onChange(tags.filter((_, idx) => idx !== i));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      remove(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div
        className="flex flex-wrap gap-1.5 p-2 min-h-[42px] border border-gray-200 rounded-md
          bg-white focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-400
          transition-colors cursor-text"
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium
              rounded-full select-none"
            style={{
              background: 'color-mix(in srgb, var(--accent) 12%, white)',
              color: 'var(--accent)',
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
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commit}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[100px] text-sm outline-none bg-transparent
            placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}
