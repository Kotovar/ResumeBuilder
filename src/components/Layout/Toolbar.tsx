import { useState } from "react";
import { useResumeStore } from "@store/resumeStore";
import { useT } from "@i18n/useT";
import type { Translations } from "@i18n/translations";
import type { AccentColor, FontFamily, ResumeSettings } from "@type/resume";

const ACCENT_OPTIONS: { value: AccentColor; hex: string }[] = [
    { value: "blue", hex: "#2563eb" },
    { value: "green", hex: "#16a34a" },
    { value: "purple", hex: "#9333ea" },
    { value: "rose", hex: "#e11d48" },
    { value: "slate", hex: "#475569" },
];

const FONT_OPTIONS: { value: FontFamily; label: string }[] = [
    { value: "ptsans", label: "PT Sans" },
    { value: "ptserif", label: "PT Serif" },
    { value: "ptmono", label: "PT Mono" },
];

const LANG = ["en", "ru"] as const;
const TEMPLATE = ["classic", "modern"] as const;

interface Props {
    onExportPDF: () => void;
    onExportJSON: () => void;
    onImportJSON: () => void;
    onReset: () => void;
}

interface PickerProps {
    t: Translations;
    settings: ResumeSettings;
    updateSettings: (data: Partial<ResumeSettings>) => void;
}

function TemplatePicker({ t, settings, updateSettings }: PickerProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
                {t.toolbar.template}
            </span>
            <div className="flex rounded-md overflow-hidden border border-gray-200">
                {TEMPLATE.map((tmpl) => (
                    <button
                        key={tmpl}
                        type="button"
                        onClick={() => updateSettings({ template: tmpl })}
                        className={`cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors capitalize
              ${settings.template === tmpl ? "text-white" : "text-gray-600 bg-white hover:bg-gray-50"}`}
                        style={
                            settings.template === tmpl
                                ? { backgroundColor: "var(--accent)" }
                                : {}
                        }
                    >
                        {tmpl === "classic"
                            ? t.toolbar.classic
                            : t.toolbar.modern}
                    </button>
                ))}
            </div>
        </div>
    );
}

function FontPicker({ t, settings, updateSettings }: PickerProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
                {t.toolbar.font}
            </span>
            <select
                value={settings.fontFamily}
                onChange={(e) =>
                    updateSettings({ fontFamily: e.target.value as FontFamily })
                }
                className="cursor-pointer text-sm border border-gray-200 rounded-md px-2 py-1.5
          bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30
          focus:border-blue-400 transition-colors"
            >
                {FONT_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                        {f.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function AccentPicker({ t, settings, updateSettings }: PickerProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
                {t.toolbar.color}
            </span>
            <div className="flex gap-1.5">
                {ACCENT_OPTIONS.map((c) => (
                    <button
                        key={c.value}
                        type="button"
                        title={c.value}
                        onClick={() => updateSettings({ accentColor: c.value })}
                        className={`cursor-pointer w-5 h-5 rounded-full border-2 transition-transform
              ${
                  settings.accentColor === c.value
                      ? "border-gray-400 scale-125"
                      : "border-transparent hover:scale-110"
              }`}
                        style={{ backgroundColor: c.hex }}
                    />
                ))}
            </div>
        </div>
    );
}

function LangPicker({ t, settings, updateSettings }: PickerProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
                {t.toolbar.language}
            </span>
            <div className="flex rounded-md overflow-hidden border border-gray-200">
                {LANG.map((lng) => (
                    <button
                        key={lng}
                        type="button"
                        onClick={() => updateSettings({ lang: lng })}
                        className={`cursor-pointer px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide
              transition-colors
              ${settings.lang === lng ? "text-white" : "text-gray-500 bg-white hover:bg-gray-50"}`}
                        style={
                            settings.lang === lng
                                ? { backgroundColor: "var(--accent)" }
                                : {}
                        }
                    >
                        {lng}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function Toolbar({
    onExportPDF,
    onExportJSON,
    onImportJSON,
    onReset,
}: Props) {
    const { settings, updateSettings } = useResumeStore();
    const t = useT();
    const [menuOpen, setMenuOpen] = useState(false);

    const pickerProps = { t, settings, updateSettings };

    return (
        <div className="relative">
            <div className="h-14 px-4 flex items-center gap-3">
                <span className="font-bold text-gray-800 text-[15px] tracking-tight shrink-0">
                    {t.toolbar.brand}
                </span>

                <div className="hidden md:flex items-center gap-3 lg:gap-5">
                    <div className="h-5 w-px bg-gray-200" />
                    <TemplatePicker {...pickerProps} />
                    <div className="h-5 w-px bg-gray-200" />
                    <FontPicker {...pickerProps} />
                    <div className="h-5 w-px bg-gray-200" />
                    <AccentPicker {...pickerProps} />
                    <div className="h-5 w-px bg-gray-200" />
                    <LangPicker {...pickerProps} />
                </div>
                <div className="flex-1" />
                <div className="hidden md:flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onReset}
                        className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 px-2.5 py-1.5
              rounded-md hover:bg-gray-100 transition-colors"
                    >
                        {t.toolbar.reset}
                    </button>
                    <button
                        type="button"
                        onClick={onImportJSON}
                        className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 px-3 py-1.5
              rounded-md border border-gray-200 hover:border-gray-300 bg-white transition-colors"
                    >
                        {t.toolbar.import}
                    </button>
                    <button
                        type="button"
                        onClick={onExportJSON}
                        className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 px-3 py-1.5
              rounded-md border border-gray-200 hover:border-gray-300 bg-white transition-colors"
                    >
                        {t.toolbar.saveJSON}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onExportPDF}
                    className="cursor-pointer text-sm font-semibold text-white px-4 py-1.5 rounded-md
            transition-opacity hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "var(--accent)" }}
                >
                    {t.toolbar.exportPDF}
                </button>

                <button
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    className="md:hidden cursor-pointer w-9 h-9 flex flex-col items-center justify-center
            gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                >
                    <span
                        className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                </button>
            </div>

            {menuOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 z-10"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div
                        className="md:hidden absolute top-full left-0 right-0 z-20
            bg-white border-b border-gray-200 shadow-lg px-4 py-4 flex flex-col gap-4"
                    >
                        <TemplatePicker {...pickerProps} />
                        <FontPicker {...pickerProps} />
                        <AccentPicker {...pickerProps} />
                        <LangPicker {...pickerProps} />

                        <div className="h-px bg-gray-100" />

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onImportJSON();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer text-sm text-gray-600 border border-gray-200 px-3 py-2
                  rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {t.toolbar.import}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onExportJSON();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer text-sm text-gray-600 border border-gray-200 px-3 py-2
                  rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {t.toolbar.saveJSON}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onReset();
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer text-sm text-gray-400 border border-gray-200 px-3 py-2
                  rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {t.toolbar.reset}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
