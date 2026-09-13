import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon, InfoIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PARAMETER_ORDER } from '../data/parameters';
import { ParameterKey } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { SensorChart } from '../components/SensorChart';
import { RangeIndicator } from '../components/RangeIndicator';
import { formatNumber, formatRelative } from '../utils/format';
import { STATUS_STYLES } from '../utils/statusStyles';

export function SensorDetail() {
  const { parameter } = useParams<{parameter: string;}>();
  const navigate = useNavigate();
  const { decision, histories, lastUpdate, isActionDone, completeAction } = useFarm();

  const key = PARAMETER_ORDER.includes(parameter as ParameterKey) ?
  parameter as ParameterKey :
  null;
  const evaluation = key ?
  decision.evaluations.find((item) => item.parameter === key) :
  undefined;

  if (!evaluation) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-ink-900">Sensor tidak ditemukan</h1>
        <p className="text-sm text-ink-500">
          Parameter yang Anda cari tidak tersedia pada sistem ini.
        </p>
        <Link
          to="/monitoring"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white">
          
          Kembali ke Monitoring
        </Link>
      </div>);

  }

  const style = STATUS_STYLES[evaluation.status];
  const done = isActionDone(evaluation);
  const isIssue = evaluation.status !== 'optimal';

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-bold text-leaf-700 hover:underline">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Kembali
      </button>

      <section className={`rounded-2xl border bg-white p-5 shadow-card ${style.border}`}>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-600">
          Detail Sensor
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{evaluation.label}</h1>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[44px] font-extrabold leading-none text-ink-900">
              {formatNumber(evaluation.value, evaluation.decimals)}
            </span>
            {evaluation.unit ?
            <span className="text-lg font-bold text-ink-400">{evaluation.unit}</span> :
            null}
          </p>
          <StatusBadge status={evaluation.status} size="md" />
        </div>

        <div className="mt-4">
          <RangeIndicator evaluation={evaluation} />
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-ink-500">
            <p>
              Rentang disarankan:{' '}
              <strong className="font-bold text-ink-900">
                {formatNumber(evaluation.target.min, evaluation.decimals)}–
                {formatNumber(evaluation.target.max, evaluation.decimals)}
                {evaluation.unit ? ` ${evaluation.unit}` : ''}
              </strong>
            </p>
            <p>Pembaruan terakhir: {formatRelative(lastUpdate)}</p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="tren-historis"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="tren-historis" className="text-base font-extrabold text-ink-900">
          Tren Historis
        </h2>
        <p className="mt-0.5 text-xs text-ink-500">
          6 jam terakhir · area hijau menandai rentang yang disarankan
        </p>
        <div className="mt-3">
          <SensorChart evaluation={evaluation} data={histories[evaluation.parameter]} height={220} />
        </div>
      </section>

      <section className="space-y-3">
        <InfoBlock title="Apa ini?" body={evaluation.description} />
        <InfoBlock title="Kondisi saat ini" body={evaluation.message} />
        <InfoBlock title="Dampak terhadap pakcoy" body={evaluation.impact} />
      </section>

      <section
        aria-labelledby="rekomendasi-sensor"
        className="rounded-2xl border border-leaf-200 bg-leaf-50 p-5">
        
        <h2
          id="rekomendasi-sensor"
          className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-leaf-700">
          
          Rekomendasi
        </h2>
        <p className="mt-1.5 text-[15px] font-bold leading-snug text-ink-900">
          {evaluation.recommendation}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-700">{evaluation.reason}</p>

        {isIssue && (
        done ?
        <p className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-leaf-300 bg-white px-4 text-sm font-bold text-leaf-700">
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Tindakan selesai
            </p> :

        <button
          type="button"
          onClick={() => completeAction(evaluation)}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700">
          
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              Sudah Dilakukan
            </button>)
        }
      </section>
    </div>);

}

function InfoBlock({ title, body }: {title: string;body: string;}) {
  return (
    <div className="rounded-2xl border border-leaf-100 bg-white p-4 shadow-card">
      <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
        <InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">{body}</p>
    </div>);

}