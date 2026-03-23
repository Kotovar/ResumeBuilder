import type { ReactNode } from 'react';

interface Props {
  toolbar: ReactNode;
  editor:  ReactNode;
  preview: ReactNode;
}

export function AppLayout({ toolbar, editor, preview }: Props) {
  return (
    /*
     * Desktop: fixed viewport height, panels scroll independently.
     * Mobile:  natural document scroll, header stays sticky at top.
     */
    <div className="min-h-screen md:h-screen flex flex-col bg-gray-50 md:overflow-hidden">
      {/* Sticky header — works on both mobile (sticky in flow) and desktop
          (the flex layout keeps it at top anyway, sticky adds safety) */}
      <header className="sticky top-0 z-20 flex-none bg-white border-b border-gray-200">
        {toolbar}
      </header>

      {/* Two-panel area */}
      <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
        {/* Editor */}
        <aside className="w-full md:w-[460px] md:flex-none md:overflow-y-auto
          bg-white border-b md:border-b-0 md:border-r border-gray-100 shadow-sm">
          {editor}
        </aside>

        {/* Preview */}
        <main className="flex-1 md:overflow-y-auto bg-gray-100 min-h-[500px]">
          {preview}
        </main>
      </div>
    </div>
  );
}
