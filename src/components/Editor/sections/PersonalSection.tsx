import { useRef, type ChangeEvent } from "react";
import { useResumeStore } from "@store/resumeStore";
import { useT } from "@i18n/useT";
import { FormField } from "../ui/FormField";
import { TipBox } from "../ui/TipBox";

const PHOTO_MAX_PX = 300;
const PHOTO_QUALITY = 0.85;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const CURRENCY_OPTIONS: { value: CurrencyValue; label: string }[] = [
    { value: "USD", label: "USD ($)" },
    { value: "RUB", label: "RUB (₽)" },
];

type CurrencyValue = "USD" | "RUB";

function resizeToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (!result || typeof result !== "string") return;
            const src = result;
            const img = new Image();
            img.onload = () => {
                const scale = Math.min(
                    PHOTO_MAX_PX / img.width,
                    PHOTO_MAX_PX / img.height,
                    1,
                );
                const w = Math.round(img.width * scale);
                const h = Math.round(img.height * scale);
                const canvas = document.createElement("canvas");
                canvas.width = w;
                canvas.height = h;
                canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL("image/jpeg", PHOTO_QUALITY));
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    });
}

export function PersonalSection() {
    const { personal, updatePersonal } = useResumeStore();
    const t = useT();
    const p = t.personal;
    const inputRef = useRef<HTMLInputElement>(null);

    const upd = (k: keyof typeof personal) => (v: string) =>
        updatePersonal({ [k]: v });

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) return;
        const base64 = await resizeToBase64(file);
        updatePersonal({ photo: base64 });
        e.target.value = "";
    };

    return (
        <div className="flex flex-col gap-4">
            <TipBox>{p.tip}</TipBox>

            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-gray-600">
                    {p.photo}
                </span>
                <div className="flex items-center gap-3">
                    {personal.photo ? (
                        <img
                            src={personal.photo}
                            alt="profile"
                            className="w-16 h-16 rounded-lg object-cover shrink-0 border border-gray-200"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center shrink-0">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="cursor-pointer text-xs px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                        >
                            {personal.photo ? p.photoReplace : p.photoUpload}
                        </button>
                        {personal.photo && (
                            <button
                                type="button"
                                onClick={() =>
                                    updatePersonal({ photo: undefined })
                                }
                                className="text-xs px-3 py-1.5 rounded border border-red-200 bg-white hover:bg-red-50 text-red-600 transition-colors"
                            >
                                {p.photoRemove}
                            </button>
                        )}
                    </div>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                    <FormField
                        label={p.fullName}
                        value={personal.fullName}
                        onChange={upd("fullName")}
                        placeholder={p.phName}
                    />
                </div>
                <div className="col-span-2">
                    <FormField
                        label={p.professionalTitle}
                        value={personal.title}
                        onChange={upd("title")}
                        placeholder={p.phTitle}
                    />
                </div>
                <FormField
                    label={p.email}
                    value={personal.email}
                    onChange={upd("email")}
                    placeholder={p.phEmail}
                    type="email"
                />
                <FormField
                    label={p.phone}
                    value={personal.phone}
                    onChange={upd("phone")}
                    placeholder={p.phPhone}
                />
                <FormField
                    label={p.location}
                    value={personal.location}
                    onChange={upd("location")}
                    placeholder={p.phLocation}
                />
                <FormField
                    label={p.website}
                    value={personal.website}
                    onChange={upd("website")}
                    placeholder={p.phWebsite}
                />
                <FormField
                    label={p.linkedin}
                    value={personal.linkedin}
                    onChange={upd("linkedin")}
                    placeholder={p.phLinkedin}
                />
                <FormField
                    label={p.github}
                    value={personal.github}
                    onChange={upd("github")}
                    placeholder={p.phGithub}
                />
                <FormField
                    label={p.telegram}
                    value={personal.telegram}
                    onChange={upd("telegram")}
                    placeholder={p.phTelegram}
                />

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {p.salaryAmount}
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={personal.salary?.amount ?? ""}
                        onChange={(e) => {
                            const amount = parseInt(e.target.value, 10);
                            updatePersonal({
                                salary:
                                    amount > 0
                                        ? {
                                              amount,
                                              currency:
                                                  personal.salary?.currency ??
                                                  "USD",
                                          }
                                        : undefined,
                            });
                        }}
                        placeholder={p.salaryPlaceholder}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder:text-gray-300 transition-colors"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {p.salaryCurrency}
                    </label>
                    <select
                        value={personal.salary?.currency ?? "USD"}
                        onChange={(e) => {
                            const currency = e.target.value;
                            if (
                                personal.salary &&
                                (currency === "USD" || currency === "RUB")
                            ) {
                                updatePersonal({
                                    salary: { ...personal.salary, currency },
                                });
                            }
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
                    >
                        {CURRENCY_OPTIONS.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
