import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircleIcon } from 'lucide-react';

interface HelpTooltipProps {
  title: string;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

/** Tombol "?" berisi penjelasan singkat sebuah fitur. */
export function HelpTooltip({ title, children, align = 'right' }: HelpTooltipProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={`Pelajari: ${title}`}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors duration-150 hover:bg-canvas-sunken hover:text-leaf-700">
        
        <HelpCircleIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          role="dialog"
          aria-label={title}
          className={`absolute z-30 mt-1 w-64 rounded-xl border border-leaf-100 bg-white p-3.5 shadow-lift ${
          align === 'right' ? 'right-0' : 'left-0'}`
          }>
          
            <p className="text-sm font-bold text-ink-900">{title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{children}</p>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}