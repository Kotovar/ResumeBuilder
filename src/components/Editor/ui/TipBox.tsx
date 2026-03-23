import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TipBox({ children }: Props) {
  return (
    <div className="flex gap-2.5 p-3 bg-blue-50 border border-blue-100 rounded-lg
      text-xs text-blue-700 leading-relaxed">
      <span className="flex-none mt-0.5">💡</span>
      <div>{children}</div>
    </div>
  );
}
