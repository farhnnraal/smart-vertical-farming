import React, { useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { DemoModeBanner } from '../components/DemoModeBanner';
import { SensorCard } from '../components/SensorCard';
import { SensorChart } from '../components/SensorChart';
import { ParameterKey } from '../types';
import { formatRelative } from '../utils/format';

export function Monitoring() {
  const { decision, lastUpdate, histories, refreshReadings } = useFarm();
  const [selected, setSelected] = useState<ParameterKey>('soilMoisture');
  const selectedEvaluation =
  decision.evaluations.find((item) => item.parameter === selected) ?? decision.evaluations[0];

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Data Sensor"
        title="Monitoring Sensor"
        description="Nilai terbaru dari lima parameter budidaya pakcoy. Ketuk kartu sensor untuk melihat penjelasan dan rekomendasinya."
        action={
        <button
          type="button"
          onClick={refreshReadings}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-leaf-200 bg-white px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
          
            <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
            Muat ulang
          </button>
        } />
      

      <p className="text-xs text-ink-400">Pembaruan terakhir: {formatRelative(lastUpdate)}</p>

      <DemoModeBanner compact />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {decision.evaluations.map((item) =>
        <SensorCard key={item.parameter} evaluation={item} lastUpdate={lastUpdate} />
        )}
      </div>

      <section
        aria-labelledby="tren-sensor"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="tren-sensor" className="text-base font-extrabold text-ink-900">
          Tren Sensor
        </h2>
        <p className="mt-0.5 text-xs text-ink-500">
          Pilih parameter untuk melihat pergerakan nilainya selama 6 jam terakhir.
        </p>

        <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {decision.evaluations.map((item) => {
            const active = item.parameter === selected;
            return (
              <button
                key={item.parameter}
                type="button"
                onClick={() => setSelected(item.parameter)}
                aria-pressed={active}
                className={`min-h-[40px] flex-none rounded-full border px-3.5 text-[13px] font-bold transition-colors duration-150 ${
                active ?
                'border-leaf-500 bg-leaf-50 text-leaf-700' :
                'border-leaf-100 bg-white text-ink-500 hover:bg-canvas-sunken'}`
                }>
                
                {item.shortLabel}
              </button>);

          })}
        </div>

        <div className="mt-3">
          <SensorChart
            evaluation={selectedEvaluation}
            data={histories[selectedEvaluation.parameter]}
            height={220} />
          
        </div>
      </section>
    </div>);

}