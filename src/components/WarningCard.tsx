import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import { ParameterEvaluation } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { formatNumber } from '../utils/format';

/** Peringatan dini untuk parameter yang keluar dari rentang. */
export function WarningCard({ evaluation }: {evaluation: ParameterEvaluation;}) {
  const style = STATUS_STYLES[evaluation.status];
  return (
    <Link
      to={`/monitoring/${evaluation.parameter}`}
      className={`block rounded-xl border px-4 py-3.5 transition-colors duration-150 ${style.border} ${style.bg} hover:brightness-[0.985]`}>
      
      <p className={`flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide ${style.text}`}>
        <AlertTriangleIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {evaluation.status === 'critical' ? 'Kritis' : 'Perlu Perhatian'}
      </p>
      <p className="mt-1.5 text-sm font-bold text-ink-900">{evaluation.message}</p>
      <p className="mt-1 text-xs text-ink-700">
        {evaluation.label}: {formatNumber(evaluation.value, evaluation.decimals)}
        {evaluation.unit ? ` ${evaluation.unit}` : ''} · Target{' '}
        {formatNumber(evaluation.target.min, evaluation.decimals)}–
        {formatNumber(evaluation.target.max, evaluation.decimals)}
        {evaluation.unit ? ` ${evaluation.unit}` : ''}
      </p>
      <p className="mt-1.5 text-xs font-semibold text-ink-900">
        Tindakan: {evaluation.recommendation}
      </p>
    </Link>);

}