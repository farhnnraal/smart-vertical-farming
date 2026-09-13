import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { DecisionResult } from '../types';
import { STATUS_STYLES } from '../utils/statusStyles';
import { StatusBadge } from './StatusBadge';
import { HelpTooltip } from './HelpTooltip';
import { formatNumber } from '../utils/format';

interface PlantConditionScoreProps {
  decision: DecisionResult;
  plantName: string;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function PlantConditionScore({ decision, plantName }: PlantConditionScoreProps) {
  const [openBreakdown, setOpenBreakdown] = useState(false);
  const style = STATUS_STYLES[decision.status];
  const dash = decision.score / 100 * CIRCUMFERENCE;

  return (
    <section
      aria-labelledby="skor-kondisi"
      className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card sm:p-6">
      
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-600">
            Kondisi {plantName} Saat Ini
          </p>
          <h2 id="skor-kondisi" className="mt-1 text-lg font-extrabold text-ink-900">
            Skor Kondisi Tanaman
          </h2>
        </div>
        <HelpTooltip title="Apa itu Skor Kondisi Tanaman?">
          Nilai 0–100 yang membantu menggambarkan kondisi pakcoy berdasarkan beberapa parameter
          lingkungan. Semakin tinggi skor, semakin sesuai kondisi dengan rentang yang disarankan.
        </HelpTooltip>
      </div>

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
        <div className="relative flex-none">
          <svg width="128" height="128" viewBox="0 0 128 128" role="img" aria-label={`Skor ${decision.score} dari 100`}>
            <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="#eff1ed" strokeWidth="11" />
            <motion.circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke={style.chart}
              strokeWidth="11"
              strokeLinecap="round"
              transform="rotate(-90 64 64)"
              strokeDasharray={CIRCUMFERENCE}
              initial={false}
              animate={{ strokeDashoffset: CIRCUMFERENCE - dash }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }} />
            
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[40px] font-extrabold leading-none text-ink-900">
              {decision.score}
            </span>
            <span className="mt-0.5 text-xs font-semibold text-ink-400">dari 100</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <StatusBadge status={decision.status} label={decision.statusLabel} size="md" />
          <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{decision.summary}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpenBreakdown((prev) => !prev)}
        aria-expanded={openBreakdown}
        className="mt-5 flex w-full items-center justify-between rounded-xl bg-canvas-sunken px-4 py-3 text-left text-sm font-bold text-ink-900 transition-colors duration-150 hover:bg-leaf-50">
        
        Kenapa nilainya {decision.score}?
        <ChevronDownIcon
          className={`h-4.5 w-4.5 text-ink-500 transition-transform duration-200 ${
          openBreakdown ? 'rotate-180' : ''}`
          }
          aria-hidden="true" />
        
      </button>

      <AnimatePresence initial={false}>
        {openBreakdown &&
        <motion.div
          key="breakdown"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <ul className="mt-3 divide-y divide-leaf-100 rounded-xl border border-leaf-100">
              {decision.evaluations.map((item) =>
            <li
              key={item.parameter}
              className="flex items-center justify-between gap-3 px-4 py-3">
              
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{item.label}</p>
                    <p className="text-xs text-ink-400">
                      Bobot {Math.round(item.weight * 100)}% · nilai{' '}
                      {formatNumber(item.value, item.decimals)}
                      {item.unit ? ` ${item.unit}` : ''}
                    </p>
                  </div>
                  <StatusBadge
                status={item.status}
                label={item.status === 'optimal' ? 'Baik' : item.statusLabel} />
              
                </li>
            )}
            </ul>
            <p className="mt-2 px-1 text-xs leading-relaxed text-ink-400">
              Skor dihitung dengan aturan sederhana: setiap parameter dinilai berdasarkan
              kesesuaiannya dengan rentang yang disarankan, lalu digabungkan sesuai bobotnya.
              Perhitungan ini berbasis aturan, bukan model machine learning.
            </p>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}