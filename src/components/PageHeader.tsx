import React from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ?
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-600">
            {eyebrow}
          </p> :
        null}
        <h1 className="mt-1 text-[22px] font-extrabold leading-tight text-ink-900 sm:text-2xl">
          {title}
        </h1>
        {description ?
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-500">{description}</p> :
        null}
      </div>
      {action ? <div className="flex-none">{action}</div> : null}
    </div>);

}