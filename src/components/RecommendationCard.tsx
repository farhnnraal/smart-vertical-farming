import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { ParameterEvaluation } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { formatNumber } from '../utils/format';
import { PRIORITY_LABEL } from '../utils/decisionEngine';
import { StatusBadge } from './StatusBadge';

interface RecommendationCardProps {
  evaluation: ParameterEvaluation;
  done: boolean;
  onComplete: () => void;
}

export function RecommendationCard({ evaluation, done, onComplete }: RecommendationCardProps) {
  const style = STATUS_STYLES[evaluation.status];

  return (
    <article className={`rounded-2xl border bg-white p-5 shadow-card ${style.border}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-canvas-sunken text-xs font-extrabold text-ink-700">
            {evaluation.rank}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide ${style.bg} ${style.text}`}>
            
            {evaluation.priority ? PRIORITY_LABEL[evaluation.priority] : 'Perlu Perhatian'}
          </span>
        </div>
        <StatusBadge status={evaluation.status} />
      </div>

      <h3 className="mt-3.5 text-base font-extrabold leading-snug text-ink-900">
        {evaluation.message}
      </h3>
      <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
        <div className="flex gap-1.5">
          <dt className="text-ink-400">Parameter:</dt>
          <dd className="font-semibold text-ink-900">{evaluation.label}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-ink-400">Nilai:</dt>
          <dd className="font-semibold text-ink-900">
            {formatNumber(evaluation.value, evaluation.decimals)}
            {evaluation.unit ? ` ${evaluation.unit}` : ''}
          </dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-ink-400">Target:</dt>
          <dd className="font-semibold text-ink-900">
            {formatNumber(evaluation.target.min, evaluation.decimals)}–
            {formatNumber(evaluation.target.max, evaluation.decimals)}
            {evaluation.unit ? ` ${evaluation.unit}` : ''}
          </dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3 rounded-xl bg-canvas-sunken p-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-700">
            Rekomendasi
          </p>
          <p className="mt-1 text-[15px] font-bold leading-snug text-ink-900">
            {evaluation.recommendation}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
            Mengapa?
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{evaluation.reason}</p>
        </div>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
            Dampak ke pakcoy
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{evaluation.impact}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-500">
          Status tindakan:{' '}
          <strong className={done ? 'font-bold text-leaf-700' : 'font-bold text-ink-900'}>
            {done ? 'Selesai' : 'Belum dilakukan'}
          </strong>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/monitoring/${evaluation.parameter}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl border border-leaf-200 px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
            
            Lihat detail sensor
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          {done ?
          <span className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-leaf-200 bg-leaf-50 px-4 text-sm font-bold text-leaf-700">
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Sudah dilakukan
            </span> :

          <button
            type="button"
            onClick={onComplete}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700">
            
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Tandai Sudah Dilakukan
            </button>
          }
        </div>
      </div>
    </article>);

}