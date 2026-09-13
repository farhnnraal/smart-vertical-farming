import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { LightbulbIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { PARAMETERS } from '../data/parameters';
import { CYCLE_BASE_STATS, CYCLE_ISSUE_COUNT, CYCLE_SCORE_LOG } from '../data/growth';
import { plantAgeInDays } from '../utils/format';

export function Evaluasi() {
  const { plant, growth, activities, decision } = useFarm();

  const scoreLog = [...CYCLE_SCORE_LOG, { day: plantAgeInDays(plant.plantingDate), score: decision.score }];
  const averageScore = Math.round(
    scoreLog.reduce((total, item) => total + item.score, 0) / scoreLog.length
  );
  const latest = growth[growth.length - 1];
  const completedInSession = activities.filter((item) => item.type === 'tindakan').length;
  const completedActions = CYCLE_BASE_STATS.completedActions + Math.max(0, completedInSession - 2);
  const warnings = CYCLE_BASE_STATS.warnings + decision.issues.length;
  const issues = [...CYCLE_ISSUE_COUNT].sort((a, b) => b.count - a.count);
  const topIssue = PARAMETERS[issues[0].parameter];
  const maxIssue = issues[0].count;

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Evaluasi"
        title="Evaluasi Budidaya"
        description="Rekap satu siklus budidaya pakcoy untuk bahan perbaikan pada siklus berikutnya." />
      

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Rata-rata skor" value={`${averageScore}`} unit="/100" />
        <StatCard label="Tinggi akhir" value={latest ? `${latest.height}` : '—'} unit="cm" />
        <StatCard label="Jumlah daun akhir" value={latest ? `${latest.leafCount}` : '—'} unit="daun" />
        <StatCard label="Umur tanaman" value={`${plantAgeInDays(plant.plantingDate)}`} unit="hari" />
        <StatCard label="Jumlah peringatan" value={`${warnings}`} unit="kali" />
        <StatCard label="Tindakan selesai" value={`${completedActions}`} unit="tindakan" />
      </section>

      <section
        aria-labelledby="tren-skor"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="tren-skor" className="text-base font-extrabold text-ink-900">
          Tren Skor Kondisi Tanaman
        </h2>
        <p className="mt-0.5 text-xs text-ink-500">
          Perkembangan skor kondisi selama siklus budidaya berjalan.
        </p>
        <div className="mt-3 h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreLog} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="#eff1ed" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#8a9386' }}
                tickLine={false}
                axisLine={{ stroke: '#e4e7e1' }}
                tickFormatter={(value: number) => `H${value}`}
                minTickGap={14} />
              
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#8a9386' }}
                tickLine={false}
                axisLine={false}
                width={38} />
              
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #ddeee2',
                  fontSize: 12,
                  fontFamily: 'inherit'
                }}
                labelFormatter={(value: number) => `Hari ke-${value}`}
                formatter={(value: number) => [`${value}/100`, 'Skor kondisi']} />
              
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2f7d4f"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 0, fill: '#2f7d4f' }}
                isAnimationActive={false} />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section
        aria-labelledby="parameter-bermasalah"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="parameter-bermasalah" className="text-base font-extrabold text-ink-900">
          Parameter yang Paling Sering Bermasalah
        </h2>
        <p className="mt-0.5 text-xs text-ink-500">
          Jumlah kemunculan status Perlu Perhatian atau Kritis selama siklus.
        </p>
        <ul className="mt-4 space-y-3">
          {issues.map((item) => {
            const config = PARAMETERS[item.parameter];
            return (
              <li key={item.parameter}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-bold text-ink-900">{config.label}</p>
                  <p className="text-xs font-semibold text-ink-500">{item.count} kali</p>
                </div>
                <div className="mt-1.5 h-2.5 w-full rounded-full bg-canvas-sunken">
                  <div
                    className="h-2.5 rounded-full bg-leaf-500"
                    style={{ width: `${item.count / maxIssue * 100}%` }}
                    aria-hidden="true" />
                  
                </div>
              </li>);

          })}
        </ul>
      </section>

      <section
        aria-labelledby="ringkasan-evaluasi"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="ringkasan-evaluasi" className="text-base font-extrabold text-ink-900">
          Ringkasan
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
          Selama periode budidaya, kondisi pakcoy relatif stabil dengan rata-rata skor{' '}
          {averageScore}/100. Parameter yang paling sering memerlukan perhatian adalah{' '}
          {topIssue.label.toLowerCase()} ({maxIssue} kali). Tercatat {warnings} peringatan dengan{' '}
          {completedActions} tindakan yang diselesaikan.
        </p>

        <div className="mt-4 rounded-xl border border-[#cfe3f4] bg-[#eaf3fb] p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#1f6fb2]">
            <LightbulbIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Insight
          </p>
          <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-ink-900">
            Pemantauan {topIssue.label.toLowerCase()} perlu menjadi perhatian utama pada siklus
            berikutnya, misalnya dengan menambah frekuensi pemeriksaan pada jam-jam rawan.
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-400">
          Catatan: angka pada halaman ini berasal dari data simulasi prototipe dan bukan hasil
          pengujian lapangan yang tervalidasi.
        </p>
      </section>
    </div>);

}

function StatCard({ label, value, unit }: {label: string;value: string;unit: string;}) {
  return (
    <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-card">
      <p className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{label}</p>
      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold leading-none text-ink-900">{value}</span>
        <span className="text-xs font-bold text-ink-400">{unit}</span>
      </p>
    </div>);

}