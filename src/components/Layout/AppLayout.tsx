import type { ReactNode } from "react";

interface Props {
    toolbar: ReactNode;
    editor: ReactNode;
    preview: ReactNode;
}

export function AppLayout({ toolbar, editor, preview }: Props) {
    return (
        <div className="min-h-screen md:h-screen flex flex-col bg-gray-50 md:overflow-hidden">
            <header className="sticky top-0 z-20 flex-none bg-white border-b border-gray-200">
                {toolbar}
            </header>
            <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
                <aside
                    className="w-full md:w-115 md:flex-none md:overflow-y-auto
          bg-white border-b md:border-b-0 md:border-r border-gray-100 shadow-sm"
                >
                    {editor}
                </aside>

                <main className="flex-1 md:overflow-y-auto bg-gray-100 min-h-125">
                    {preview}
                </main>
            </div>
        </div>
    );
}
