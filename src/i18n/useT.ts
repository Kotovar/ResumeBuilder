import { useResumeStore } from '../store/resumeStore';
import { getT } from './translations';

/** Returns the translation object for the current UI language. */
export function useT() {
  const lang = useResumeStore((s) => s.settings.lang);
  return getT(lang);
}
