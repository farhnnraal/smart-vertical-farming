import React from 'react';
import { ParameterEvaluation } from '../types';
import { PARAMETERS } from '../data/parameters';
import { STATUS_STYLES } from '../utils/statusStyles';

/** Indikator visual sederhana: posisi nilai terhadap rentang yang disarankan. */
export function RangeIndicator({ evaluation }: {evaluation: ParameterEvaluation;}) {
  const config = PARAMETERS[evaluation.parameter];
  const span = config.chartMax - config.chartMin;
  const toPercent = (value: number) =>
  Math.min(100, Math.max(0, (value - config.chartMin) / span * 100));

  const left = toPercent(evaluation.target.min);
  const width = Math.max(2, toPercent(evaluation.target.max) - left);
  const marker = toPercent(evaluation.value);
  const style = STATUS_STYLES[evaluation.status];

  return (
    <div className="pt-1" aria-hidden="true">
      <div className="relative h-2 w-full rounded-full bg-canvas-sunken">
        <div
          className="absolute inset-y-0 rounded-full bg-leaf-200"
          style={{ left: `${left}%`, width: `${width}%` }} />
        
        <span
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${style.dot}`}
          style={{ left: `${marker}%` }} />
        
      </div>
    </div>);

}