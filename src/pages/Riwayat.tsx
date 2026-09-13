import React, { useState } from 'react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { ActivityList } from '../components/ActivityList';
import { ActivityType } from '../types';

const FILTERS: {id: 'semua' | ActivityType;label: string;}[] = [
{ id: 'semua', label: 'Semua' },
{ id: 'tindakan', label: 'Tindakan' },
{ id: 'peringatan', label: 'Peringatan' },
{ id: 'pertumbuhan', label: 'Pertumbuhan' },
{ id: 'sensor', label: 'Data Sensor' }];


export function Riwayat() {
  const { activities } = useFarm();
  const [filter, setFilter] = useState<'semua' | ActivityType>('semua');

  const filtered =
  filter === 'semua' ? activities : activities.filter((item) => item.type === filter);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Riwayat"
        title="Riwayat Aktivitas"
        description="Catatan perubahan data sensor, peringatan, tindakan yang diselesaikan, dan catatan pertumbuhan." />
      

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Saring riwayat">
        {FILTERS.map((item) => {
          const active = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={active}
              className={`min-h-[40px] flex-none rounded-full border px-3.5 text-[13px] font-bold transition-colors duration-150 ${
              active ?
              'border-leaf-500 bg-leaf-50 text-leaf-700' :
              'border-leaf-100 bg-white text-ink-500 hover:bg-canvas-sunken'}`
              }>
              
              {item.label}
            </button>);

        })}
      </div>

      <ActivityList activities={filtered} />
    </div>);

}