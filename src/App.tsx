import { useEffect } from "react";
import { AppLayout } from "./components/Layout/AppLayout";
import { Toolbar } from "./components/Layout/Toolbar";
import { EditorPanel } from "./components/Editor/EditorPanel";
import { PreviewPanel } from "./components/Preview/PreviewPanel";
import { useResumeStore } from "./store/resumeStore";
import { useExport } from "./hooks/useExport";
import { getT } from "./i18n/translations";
import { FONT_STACK, ACCENT_HEX } from "@shared/consts";

export default function App() {
    const store = useResumeStore();
    const { settings, loadResume, resetResume } = store;
    const { exportPDF, exportJSON, importJSON } = useExport(store);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--accent",
            ACCENT_HEX[settings.accentColor],
        );
    }, [settings.accentColor]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--resume-font",
            FONT_STACK[settings.fontFamily] ?? FONT_STACK.ptsans,
        );
    }, [settings.fontFamily]);

    const handleReset = () => {
        const t = getT(settings.lang);
        if (window.confirm(t.confirm.reset)) resetResume();
    };

    return (
        <AppLayout
            toolbar={
                <Toolbar
                    onExportPDF={exportPDF}
                    onExportJSON={exportJSON}
                    onImportJSON={() => importJSON(loadResume)}
                    onReset={handleReset}
                />
            }
            editor={<EditorPanel />}
            preview={<PreviewPanel />}
        />
    );
}
