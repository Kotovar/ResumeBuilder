import { useResumeStore } from '../../../store/resumeStore';
import { useT } from '../../../i18n/useT';
import { FormField } from '../ui/FormField';
import { TipBox } from '../ui/TipBox';

export function PersonalSection() {
  const { personal, updatePersonal } = useResumeStore();
  const t = useT();
  const p = t.personal;
  const upd = (k: keyof typeof personal) => (v: string) => updatePersonal({ [k]: v });

  return (
    <div className="flex flex-col gap-4">
      <TipBox>{p.tip}</TipBox>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <FormField label={p.fullName} value={personal.fullName} onChange={upd('fullName')} placeholder={p.phName} />
        </div>
        <div className="col-span-2">
          <FormField label={p.professionalTitle} value={personal.title} onChange={upd('title')} placeholder={p.phTitle} />
        </div>
        <FormField label={p.email}    value={personal.email}    onChange={upd('email')}    placeholder={p.phEmail}    type="email" />
        <FormField label={p.phone}    value={personal.phone}    onChange={upd('phone')}    placeholder={p.phPhone} />
        <FormField label={p.location} value={personal.location} onChange={upd('location')} placeholder={p.phLocation} />
        <FormField label={p.website}  value={personal.website}  onChange={upd('website')}  placeholder={p.phWebsite} />
        <FormField label={p.linkedin} value={personal.linkedin} onChange={upd('linkedin')} placeholder={p.phLinkedin} />
        <FormField label={p.github}   value={personal.github}   onChange={upd('github')}   placeholder={p.phGithub} />
      </div>
    </div>
  );
}
