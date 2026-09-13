import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  ClipboardCheckIcon,
  HistoryIcon,
  RulerIcon,
  SproutIcon,
  BellRingIcon,
  CalendarDaysIcon } from
'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { DemoModeBanner } from '../components/DemoModeBanner';
import { PlantConditionScore } from '../components/PlantConditionScore';
import { PriorityActionCard } from '../components/PriorityActionCard';
import { SensorCard } from '../components/SensorCard';
import { SensorChart } from '../components/SensorChart';
import { WarningCard } from '../components/WarningCard';
import { ActivityList } from '../components/ActivityList';
import { HelpTooltip } from '../components/HelpTooltip';
import { plantAgeInDays } from '../utils/format';

export function Beranda() {
  const {
    decision,
    lastUpdate,
    histories,
    isActionDone,
    completeAction,
    plant,
    growth,
    activities
  } = useFarm();

  const mainProblem = decision.mainProblem;
  const trendEvaluation =
  mainProblem ?? decision.evaluations.find((item) => item.parameter === 'soilMoisture')!;
  const latestGrowth = growth[growth.length - 1];
  const age = plantAgeInDays(plant.plantingDate);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-600">
          Sistem Pendukung Keputusan Budidaya Pakcoy
        </p>
        <h1 className="mt-1 text-[26px] font-extrabold leading-tight text-ink-900 sm:text-[30px]">
          Beranda
        </h1>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-ink-500">
          Prototipe “Smart Vertical Farming: Sistem Pendukung Keputusan Budidaya Pakcoy untuk
          Optimalisasi Pertanian pada Lahan Perkotaan Terbatas”.
        </p>
      </header>

      <DemoModeBanner />

      <PlantConditionScore decision={decision} plantName={plant.name} />

      <PriorityActionCard
        problem={mainProblem}
        done={mainProblem ? isActionDone(mainProblem) : false}
        onComplete={() => mainProblem && completeAction(mainProblem)}
        totalIssues={decision.issues.length} />
      

      {decision.issues.length > 0 &&
      <section aria-labelledby="peringatan-dini" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2
            id="peringatan-dini"
            className="flex items-center gap-2 text-base font-extrabold text-ink-900">
            
              <BellRingIcon className="h-4.5 w-4.5 text-[#c98010]" aria-hidden="true" />
              Peringatan Dini
            </h2>
            <span className="text-xs font-semibold text-ink-400">
              {decision.issues.length} parameter
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {decision.issues.map((item) =>
          <WarningCard key={item.parameter} evaluation={item} />
          )}
          </div>
        </section>
      }

      <section aria-labelledby="ringkasan-sensor" className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="ringkasan-sensor" className="text-base font-extrabold text-ink-900">
            Ringkasan Sensor
          </h2>
          <Link
            to="/monitoring"
            className="inline-flex min-h-[36px] items-center gap-1 text-sm font-bold text-leaf-700 hover:underline">
            
            Lihat semua
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
          {decision.evaluations.map((item) =>
          <SensorCard key={item.parameter} evaluation={item} lastUpdate={lastUpdate} />
          )}
        </div>
      </section>

      <section
        aria-labelledby="tren-sensor"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 id="tren-sensor" className="text-base font-extrabold text-ink-900">
              Tren {trendEvaluation.label}
            </h2>
            <p className="mt-0.5 text-xs text-ink-500">
              6 jam terakhir · area hijau menandai rentang yang disarankan
            </p>
          </div>
          <HelpTooltip title="Apa gunanya tren ini?">
            Tren membantu melihat apakah kondisi sedang membaik atau menurun, bukan hanya nilai
            satu waktu.
          </HelpTooltip>
        </div>
        <div className="mt-3">
          <SensorChart
            evaluation={trendEvaluation}
            data={histories[trendEvaluation.parameter]} />
          
        </div>
      </section>

      <section aria-labelledby="ringkasan-pertumbuhan" className="space-y-3">
        <h2 id="ringkasan-pertumbuhan" className="text-base font-extrabold text-ink-900">
          Ringkasan Pertumbuhan
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile
            icon={CalendarDaysIcon}
            label="Umur Tanaman"
            value={`${age}`}
            unit="hari" />
          
          <StatTile
            icon={RulerIcon}
            label="Tinggi Terakhir"
            value={latestGrowth ? `${latestGrowth.height}` : '—'}
            unit="cm" />
          
          <StatTile
            icon={SproutIcon}
            label="Jumlah Daun"
            value={latestGrowth ? `${latestGrowth.leafCount}` : '—'}
            unit="daun" />
          
          <StatTile
            icon={ClipboardCheckIcon}
            label="Catatan Pertumbuhan"
            value={`${growth.length}`}
            unit="catatan" />
          
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to="/tanaman"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-leaf-200 bg-white px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
            
            <SproutIcon className="h-4 w-4" aria-hidden="true" />
            Catat pertumbuhan
          </Link>
          <Link
            to="/evaluasi"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-leaf-200 bg-white px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
            
            <ClipboardCheckIcon className="h-4 w-4" aria-hidden="true" />
            Evaluasi budidaya
          </Link>
        </div>
      </section>

      <section aria-labelledby="aktivitas-terbaru" className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="aktivitas-terbaru" className="text-base font-extrabold text-ink-900">
            Aktivitas Terbaru
          </h2>
          <Link
            to="/riwayat"
            className="inline-flex min-h-[36px] items-center gap-1 text-sm font-bold text-leaf-700 hover:underline">
            
            <HistoryIcon className="h-4 w-4" aria-hidden="true" />
            Riwayat
          </Link>
        </div>
        <ActivityList activities={activities.slice(0, 4)} />
      </section>
    </div>);

}

function StatTile({
  icon: Icon,
  label,
  value,
  unit





}: {icon: typeof SproutIcon;label: string;value: string;unit: string;}) {
  return (
    <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-card">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold leading-none text-ink-900">{value}</span>
        <span className="text-xs font-bold text-ink-400">{unit}</span>
      </p>
    </div>);

}