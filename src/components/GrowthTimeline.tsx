import React from 'react';
import { ImageIcon } from 'lucide-react';
import { GrowthRecord } from '../types';
import { formatDate } from '../utils/format';

/** Riwayat pertumbuhan berbentuk garis waktu sederhana. */
export function GrowthTimeline({ records }: {records: GrowthRecord[];}) {
  const ordered = [...records].sort((a, b) => b.day - a.day);

  return (
    <ol className="relative space-y-4 pl-6">
      <span
        className="absolute left-[7px] top-2 bottom-2 w-px bg-leaf-200"
        aria-hidden="true" />
      
      {ordered.map((record) =>
      <li key={record.id} className="relative">
          <span
          className="absolute -left-6 top-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-leaf-500"
          aria-hidden="true" />
        
          <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-extrabold text-ink-900">Hari ke-{record.day}</p>
              <p className="text-xs text-ink-400">{formatDate(record.date)}</p>
            </div>
            <div className="mt-3 flex gap-3">
              {record.photo ?
            <img
              src={record.photo}
              alt={`Foto pakcoy hari ke-${record.day}`}
              className="h-20 w-20 flex-none rounded-xl object-cover"
              loading="lazy" /> :


            <span className="flex h-20 w-20 flex-none items-center justify-center rounded-xl bg-canvas-sunken text-ink-400">
                  <ImageIcon className="h-5 w-5" aria-hidden="true" />
                </span>
            }
              <div className="min-w-0">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                      Tinggi
                    </p>
                    <p className="text-base font-extrabold text-ink-900">{record.height} cm</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                      Jumlah Daun
                    </p>
                    <p className="text-base font-extrabold text-ink-900">{record.leafCount}</p>
                  </div>
                </div>
                {record.note ?
              <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{record.note}</p> :
              null}
              </div>
            </div>
          </div>
        </li>
      )}
    </ol>);

}