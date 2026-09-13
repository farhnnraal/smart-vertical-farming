import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, OctagonAlertIcon } from 'lucide-react';
import { Status } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';

interface StatusBadgeProps {
  status: Status;
  label?: string;
  size?: 'sm' | 'md';
}

const ICONS = {
  optimal: CheckCircle2Icon,
  warning: AlertTriangleIcon,
  critical: OctagonAlertIcon
};

/** Status selalu ditampilkan dengan teks + ikon + warna. */
export function StatusBadge({ status, label, size = 'sm' }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  const Icon = ICONS[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${style.bg} ${style.border} ${style.text} ${
      size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-sm'}`
      }>
      
      <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
      {label ?? style.label}
    </span>);

}