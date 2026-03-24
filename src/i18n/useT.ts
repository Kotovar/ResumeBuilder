import { useResumeStore } from "@store/resumeStore";
import { getT } from "./translations";

export function useT() {
    const lang = useResumeStore((s) => s.settings.lang);
    return getT(lang);
}
