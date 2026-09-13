import React from 'react';
import { SproutIcon } from 'lucide-react';
import { RackLayer } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { StatusBadge } from './StatusBadge';

/** Visualisasi rak vertikal 10 tingkat, dari tingkat teratas ke bawah. */
export function RackVisualization({ layers }: {layers: RackLayer[];}) {
  const ordered = [...layers].sort((a, b) => b.level - a.level);

  return (
    <ul className="space-y-2">
      {ordered.map((layer) => {
        const style = STATUS_STYLES[layer.status];
        return (
          <li
            key={layer.level}
            className={`flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5 ${style.border}`}>
            
            <span className="flex h-11 w-11 flex-none flex-col items-center justify-center rounded-lg bg-canvas-sunken">
              <span className="text-[9px] font-bold uppercase text-ink-400">Lvl</span>
              <span className="text-sm font-extrabold leading-none text-ink-900">
                {layer.level}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <SproutIcon className="h-3.5 w-3.5 flex-none text-leaf-600" aria-hidden="true" />
                <p className="truncate text-sm font-bold text-ink-900">
                  Pakcoy · {layer.pots} pot
                </p>
              </div>
              <p className="mt-0.5 truncate text-xs text-ink-500">{layer.note}</p>
            </div>
            <div className="flex-none">
              <StatusBadge status={layer.status} />
            </div>
          </li>);

      })}
    </ul>);

}