import React from 'react';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  GaugeIcon,
  ListChecksIcon,
  SproutIcon,
  InboxIcon } from
'lucide-react';
import { ActivityRecord, ActivityType } from '../types';
import { formatRelative } from '../utils/format';
import { EmptyState } from './EmptyState';

const TYPE_META: Record<
  ActivityType,
  {label: string;icon: typeof CheckCircle2Icon;text: string;bg: string;}> =
{
  tindakan: {
    label: 'Tindakan',
    icon: CheckCircle2Icon,
    text: 'text-[#2f7d4f]',
    bg: 'bg-[#eaf5ed]'
  },
  peringatan: {
    label: 'Peringatan',
    icon: AlertTriangleIcon,
    text: 'text-[#9a5f05]',
    bg: 'bg-[#fdf3e3]'
  },
  rekomendasi: {
    label: 'Rekomendasi',
    icon: ListChecksIcon,
    text: 'text-[#1f6fb2]',
    bg: 'bg-[#eaf3fb]'
  },
  pertumbuhan: {
    label: 'Pertumbuhan',
    icon: SproutIcon,
    text: 'text-[#2f7d4f]',
    bg: 'bg-[#eaf5ed]'
  },
  sensor: { label: 'Data Sensor', icon: GaugeIcon, text: 'text-ink-700', bg: 'bg-canvas-sunken' }
};

export function ActivityList({ activities }: {activities: ActivityRecord[];}) {
  if (activities.length === 0) {
    return (
      <EmptyState
        icon={InboxIcon}
        title="Belum ada aktivitas"
        description="Aktivitas akan muncul setelah ada peringatan, tindakan, atau catatan pertumbuhan baru." />);


  }

  return (
    <ul className="divide-y divide-leaf-100 overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-card">
      {activities.map((activity) => {
        const meta = TYPE_META[activity.type];
        return (
          <li key={activity.id} className="flex gap-3 px-4 py-3.5">
            <span
              className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full ${meta.bg} ${meta.text}`}>
              
              <meta.icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className="text-sm font-bold text-ink-900">{activity.title}</p>
                <p className="flex-none text-xs text-ink-400">
                  {formatRelative(activity.timestamp)}
                </p>
              </div>
              <p className="mt-0.5 text-[13px] leading-relaxed text-ink-500">{activity.detail}</p>
              <p className={`mt-1 text-[11px] font-bold uppercase tracking-wide ${meta.text}`}>
                {meta.label}
              </p>
            </div>
          </li>);

      })}
    </ul>);

}