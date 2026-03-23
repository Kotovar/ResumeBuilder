import { useRef, useEffect, useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

const RESUME_WIDTH = 794; // A4 at 96 dpi

export function PreviewPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);
  const { settings } = useResumeStore();

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const available = containerRef.current.clientWidth - 48;
      setScale(Math.min(1, available / RESUME_WIDTH));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const Template =
    settings.template === 'modern' ? ModernTemplate : ClassicTemplate;

  return (
    <div ref={containerRef} className="flex flex-col items-center py-8 px-6 min-h-full">
      {/* Scale wrapper — zoom properly affects layout unlike transform:scale */}
      <div
        style={{
          width: RESUME_WIDTH * scale,
          transformOrigin: 'top left',
        }}
      >
        <div
          style={{
            width: RESUME_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          }}
        >
          <Template />
        </div>
      </div>
    </div>
  );
}
