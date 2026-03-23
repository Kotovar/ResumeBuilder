interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
          placeholder:text-gray-300 transition-colors"
      />
    </div>
  );
}
