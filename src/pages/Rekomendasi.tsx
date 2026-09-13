import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheckIcon, HistoryIcon, ShieldCheckIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { DemoModeBanner } from '../components/DemoModeBanner';
import { RecommendationCard } from '../components/RecommendationCard';
import { EmptyState } from '../components/EmptyState';
import { HelpTooltip } from '../components/HelpTooltip';

const STEPS = [
'Sistem membaca nilai setiap sensor.',
'Nilai dibandingkan dengan rentang yang disarankan untuk pakcoy.',
'Parameter di luar rentang diberi status Perlu Perhatian atau Kritis.',
'Masalah diurutkan berdasarkan tingkat keparahan dan pengaruhnya pada tanaman.',
'Sistem menampilkan rekomendasi tindakan beserta alasannya.'];


export function Rekomendasi() {
  const { decision, isActionDone, completeAction, activities } = useFarm();
  const issues = decision.issues;
  const doneCount = issues.filter((item) => isActionDone(item)).length;

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Sistem Pendukung Keputusan"
        title="Rekomendasi"
        description="Sistem menganalisis kondisi tanaman lalu menyusun prioritas tindakan yang dapat Anda lakukan."
        action={
        <HelpTooltip title="Apa itu Sistem Pendukung Keputusan?">
            Sistem menganalisis kondisi tanaman dan memberikan prioritas tindakan yang dapat
            dilakukan pengguna. Analisis memakai aturan sederhana berbasis rentang parameter, bukan
            model machine learning.
          </HelpTooltip>
        } />
      

      <DemoModeBanner compact />

      <section className="grid grid-cols-3 gap-3">
        <SummaryTile label="Perlu tindakan" value={`${issues.length - doneCount}`} />
        <SummaryTile label="Sudah dilakukan" value={`${doneCount}`} />
        <SummaryTile label="Skor kondisi" value={`${decision.score}`} suffix="/100" />
      </section>

      {issues.length === 0 ?
      <EmptyState
        icon={ShieldCheckIcon}
        title="Tidak ada tindakan mendesak"
        description="Semua parameter berada pada rentang yang disarankan. Lanjutkan pemantauan rutin dan catat pertumbuhan pakcoy."
        action={
        <Link
          to="/tanaman"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700">
          
              <ClipboardCheckIcon className="h-4 w-4" aria-hidden="true" />
              Catat pertumbuhan
            </Link>
        } /> :


      <section aria-labelledby="prioritas-tindakan" className="space-y-3">
          <h2 id="prioritas-tindakan" className="text-base font-extrabold text-ink-900">
            Prioritas Tindakan
          </h2>
          <p className="text-[13px] leading-relaxed text-ink-500">
            Kerjakan dari prioritas 1. Urutan disusun dari masalah yang paling berpengaruh pada
            pertumbuhan pakcoy.
          </p>
          <div className="space-y-3">
            {issues.map((item) =>
          <RecommendationCard
            key={item.parameter}
            evaluation={item}
            done={isActionDone(item)}
            onComplete={() => completeAction(item)} />

          )}
          </div>
        </section>
      }

      <section
        aria-labelledby="cara-kerja"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="cara-kerja" className="text-base font-extrabold text-ink-900">
          Bagaimana sistem mengambil keputusan?
        </h2>
        <ol className="mt-3 space-y-2.5">
          {STEPS.map((step, index) =>
          <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-leaf-50 text-xs font-extrabold text-leaf-700">
                {index + 1}
              </span>
              <p className="pt-0.5 text-[13px] leading-relaxed text-ink-700">{step}</p>
            </li>
          )}
        </ol>
        <p className="mt-4 rounded-xl bg-canvas-sunken p-3.5 text-xs leading-relaxed text-ink-500">
          Prototipe ini menggunakan analisis berbasis aturan (rule-based) dengan pembobotan
          sederhana. Sistem tidak memakai model kecerdasan buatan terlatih dan tidak menjamin hasil
          panen tertentu.
        </p>
      </section>

      <section aria-labelledby="riwayat-tindakan" className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="riwayat-tindakan" className="text-base font-extrabold text-ink-900">
            Tindakan Terakhir
          </h2>
          <Link
            to="/riwayat"
            className="inline-flex min-h-[36px] items-center gap-1 text-sm font-bold text-leaf-700 hover:underline">
            
            <HistoryIcon className="h-4 w-4" aria-hidden="true" />
            Riwayat lengkap
          </Link>
        </div>
        <ul className="divide-y divide-leaf-100 overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-card">
          {activities.
          filter((activity) => activity.type === 'tindakan').
          slice(0, 3).
          map((activity) =>
          <li key={activity.id} className="px-4 py-3.5">
                <p className="text-sm font-bold text-ink-900">{activity.title}</p>
                <p className="mt-0.5 text-[13px] text-ink-500">{activity.detail}</p>
              </li>
          )}
          {activities.filter((activity) => activity.type === 'tindakan').length === 0 &&
          <li className="px-4 py-4 text-sm text-ink-500">Belum ada tindakan yang dicatat.</li>
          }
        </ul>
      </section>
    </div>);

}

function SummaryTile({
  label,
  value,
  suffix




}: {label: string;value: string;suffix?: string;}) {
  return (
    <div className="rounded-2xl border border-leaf-100 bg-white p-4 text-center shadow-card">
      <p className="text-2xl font-extrabold leading-none text-ink-900">
        {value}
        {suffix ? <span className="text-sm font-bold text-ink-400">{suffix}</span> : null}
      </p>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">{label}</p>
    </div>);

}