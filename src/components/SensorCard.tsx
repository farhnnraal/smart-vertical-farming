import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { ParameterEvaluation } from '../types';
import { formatNumber, formatRelative } from '../utils/format';
import { StatusBadge } from './StatusBadge';
import { RangeIndicator } from './RangeIndicator';

interface SensorCardProps {
  evaluation: ParameterEvaluation;
  lastUpdate: number;
}

export function SensorCard({ evaluation, lastUpdate }: SensorCardProps) {
  return (
    <Link
      to={`/monitoring/${evaluation.parameter}`}
      className="flex h-full flex-col rounded-2xl border border-leaf-100 bg-white p-4 shadow-card transition-colors duration-150 hover:border-leaf-300"
      aria-label={`Detail ${evaluation.label}`}>
      
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-bold uppercase tracking-wide text-ink-500">
          {evaluation.label}
        </p>
        <ChevronRightIcon className="h-4 w-4 flex-none text-ink-400" aria-hidden="true" />
      </div>

      <p className="mt-2 flex items-baseline gap-1">
        <span className="text-[28px] font-extrabold leading-none text-ink-900">
          {formatNumber(evaluation.value, evaluation.decimals)}
        </span>
        {evaluation.unit ?
        <span className="text-sm font-bold text-ink-400">{evaluation.unit}</span> :
        null}
      </p>

      <div className="mt-2.5">
        <StatusBadge status={evaluation.status} />
      </div>

      <RangeIndicator evaluation={evaluation} />

      <div className="mt-auto pt-3 text-xs text-ink-400">
        <p>
          Target {formatNumber(evaluation.target.min, evaluation.decimals)}–
          {formatNumber(evaluation.target.max, evaluation.decimals)}
          {evaluation.unit ? ` ${evaluation.unit}` : ''}
        </p>
        <p className="mt-0.5">Pembaruan: {formatRelative(lastUpdate)}</p>
      </div>
    </Link>);

}