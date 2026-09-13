import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConicalIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';

/** Penanda tegas bahwa data yang tampil adalah data simulasi. */
export function DemoModeBanner({ compact = false }: {compact?: boolean;}) {
  const { demoMode, scenarioName, connectionMessage } = useFarm();
  if (!demoMode) return null;

  return (
    <div className="rounded-2xl border border-[#f0d9ad] bg-[#fdf3e3] px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[#9a5f05]">
          <FlaskConicalIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-extrabold uppercase tracking-wide text-[#9a5f05]">
            Mode Demo · Data Simulasi
          </p>
          {!compact &&
          <p className="mt-1 text-[13px] leading-relaxed text-[#7a4c07]">
              {connectionMessage} Skenario aktif: <strong>{scenarioName}</strong>.{' '}
              <Link to="/pengaturan" className="font-bold underline underline-offset-2">
                Atur koneksi data
              </Link>
            </p>
          }
        </div>
      </div>
    </div>);

}