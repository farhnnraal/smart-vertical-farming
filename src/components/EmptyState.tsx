import React from "react";
import { BoxIcon } from "lucide-react";
interface EmptyStateProps {
  icon: BoxIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return <div className="flex flex-col items-center rounded-2xl border border-dashed border-leaf-200 bg-leaf-50/60 px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-leaf-600">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-4 text-base font-bold text-ink-900">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>;
}