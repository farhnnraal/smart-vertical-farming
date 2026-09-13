import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon, LeafIcon, ShieldCheckIcon } from 'lucide-react';
import { ParameterEvaluation } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { formatNumber } from '../utils/format';
import { PRIORITY_LABEL } from '../utils/decisionEngine';

interface PriorityActionCardProps {
  problem: ParameterEvaluation | null;
  done: boolean;
  onComplete: () => void;
  totalIssues: number;
}

/** Kartu "Masalah Utama + Prioritas Tindakan" pada Beranda. */
export function PriorityActionCard({
  problem,
  done,
  onComplete,
  totalIssues
}: PriorityActionCardProps) {
  if (!problem) {
    return (
      <section
        aria-labelledby="masalah-utama"
        className="rounded-2xl border border-leaf-200 bg-leaf-50 p-5 shadow-card">
        
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-600">
          Masalah Utama
        </p>
        <h2 id="masalah-utama" className="mt-1.5 flex items-center gap-2 text-lg font-extrabold text-ink-900">
          <ShieldCheckIcon className="h-5 w-5 text-leaf-600" aria-hidden="true" />
          Tidak ada masalah kritis.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">
          Semua parameter berada pada rentang yang disarankan.{' '}
          <strong className="font-bold">Tidak ada tindakan mendesak.</strong> Lanjutkan pemantauan
          dan penyiraman seperti biasa.
        </p>
      </section>);

  }

  const style = STATUS_STYLES[problem.status];

  return (
    <section
      aria-labelledby="masalah-utama"
      className={`rounded-2xl border bg-white p-5 shadow-card ${style.border}`}>
      
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide ${style.bg} ${style.text}`}>
          
          {problem.priority ? PRIORITY_LABEL[problem.priority] : 'Perlu Perhatian'}
        </span>
        {totalIssues > 1 &&
        <span className="text-xs font-semibold text-ink-400">
            {totalIssues - 1} masalah lain menunggu
          </span>
        }
      </div>

      <p className="mt-3.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
        Masalah Utama
      </p>
      <h2 id="masalah-utama" className="mt-1 text-lg font-extrabold leading-snug text-ink-900">
        {problem.message}
      </h2>
      <p className="mt-1 text-sm text-ink-500">
        {problem.label}: {formatNumber(problem.value, problem.decimals)}
        {problem.unit ? ` ${problem.unit}` : ''} · Target{' '}
        {formatNumber(problem.target.min, problem.decimals)}–
        {formatNumber(problem.target.max, problem.decimals)}
        {problem.unit ? ` ${problem.unit}` : ''}
      </p>

      <div className="mt-4 rounded-xl bg-canvas-sunken p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-700">
          Prioritas Tindakan
        </p>
        <p className="mt-1.5 text-[15px] font-bold leading-snug text-ink-900">
          {problem.recommendation}
        </p>
        <p className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
          Mengapa?
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
          {problem.reason} {problem.impact}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        {done ?
        <span className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-leaf-200 bg-leaf-50 px-4 text-sm font-bold text-leaf-700">
            <CheckIcon className="h-4.5 w-4.5" aria-hidden="true" />
            Tindakan selesai
          </span> :

        <button
          type="button"
          onClick={onComplete}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700">
          
            <CheckIcon className="h-4.5 w-4.5" aria-hidden="true" />
            Sudah Dilakukan
          </button>
        }
        <Link
          to="/rekomendasi"
          className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-xl border border-leaf-200 px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
          
          <LeafIcon className="h-4 w-4" aria-hidden="true" />
          Lihat semua rekomendasi
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>);

}