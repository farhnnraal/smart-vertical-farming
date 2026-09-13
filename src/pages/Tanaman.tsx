import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheckIcon, LayersIcon, SproutIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { GrowthChart } from '../components/GrowthChart';
import { GrowthForm } from '../components/GrowthForm';
import { GrowthTimeline } from '../components/GrowthTimeline';
import { RackVisualization } from '../components/RackVisualization';
import { EmptyState } from '../components/EmptyState';
import { RACK_LAYERS } from '../data/plant';
import { RACK_PHOTO } from '../assets/images';
import { formatDate, plantAgeInDays } from '../utils/format';

export function Tanaman() {
  const { plant, growth, decision } = useFarm();
  const latest = growth[growth.length - 1];
  const age = plantAgeInDays(plant.plantingDate);
  const optimalLayers = RACK_LAYERS.filter((layer) => layer.status === 'optimal').length;

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Profil Tanaman"
        title="Tanaman"
        description="Profil pakcoy yang dibudidayakan beserta catatan pertumbuhannya."
        action={
        <Link
          to="/evaluasi"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-leaf-200 bg-white px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
          
            <ClipboardCheckIcon className="h-4 w-4" aria-hidden="true" />
            Evaluasi
          </Link>
        } />
      

      <section className="overflow-hidden rounded-2xl border border-leaf-100 bg-white shadow-card">
        <img
          src={RACK_PHOTO}
          alt="Rak vertikal 10 tingkat berisi tanaman pakcoy"
          className="h-40 w-full object-cover sm:h-48" />
        
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-ink-900">{plant.name}</h2>
              <p className="text-sm italic text-ink-500">{plant.scientificName}</p>
            </div>
            <StatusBadge status={decision.status} label={decision.statusLabel} size="md" />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
            <InfoItem label="Varietas" value={plant.variety} />
            <InfoItem label="Tanggal tanam" value={formatDate(plant.plantingDate)} />
            <InfoItem label="Umur tanaman" value={`${age} hari`} />
            <InfoItem label="Skor kondisi" value={`${decision.score}/100`} />
            <InfoItem label="Tinggi terakhir" value={latest ? `${latest.height} cm` : '—'} />
            <InfoItem label="Jumlah daun" value={latest ? `${latest.leafCount} daun` : '—'} />
          </dl>
          <p className="mt-4 rounded-xl bg-canvas-sunken px-3.5 py-3 text-[13px] leading-relaxed text-ink-500">
            Lokasi: {plant.location}
          </p>
        </div>
      </section>

      <section aria-labelledby="rak-vertikal" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2
            id="rak-vertikal"
            className="flex items-center gap-2 text-base font-extrabold text-ink-900">
            
            <LayersIcon className="h-4.5 w-4.5 text-leaf-600" aria-hidden="true" />
            Rak Vertikal 10 Tingkat
          </h2>
          <span className="text-xs font-semibold text-ink-400">
            {optimalLayers} dari {RACK_LAYERS.length} tingkat optimal
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-ink-500">
          Kondisi tiap tingkat rak. Tingkat paling bawah biasanya menerima cahaya paling sedikit.
        </p>
        <RackVisualization layers={RACK_LAYERS} />
      </section>

      <section aria-labelledby="pertumbuhan" className="space-y-3">
        <h2 id="pertumbuhan" className="text-base font-extrabold text-ink-900">
          Pertumbuhan Tanaman
        </h2>
        {growth.length === 0 ?
        <EmptyState
          icon={SproutIcon}
          title="Belum ada data pertumbuhan"
          description="Tambahkan pengukuran pertama untuk mulai melihat perkembangan pakcoy." /> :


        <div className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
            <p className="text-[13px] text-ink-500">
              Tinggi tanaman dan jumlah daun pada setiap pengukuran.
            </p>
            <div className="mt-3">
              <GrowthChart records={growth} />
            </div>
          </div>
        }

        <GrowthForm />

        {growth.length > 0 &&
        <div className="pt-1">
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-ink-500">
              Riwayat Pengukuran
            </h3>
            <GrowthTimeline records={growth} />
          </div>
        }
      </section>
    </div>);

}

function InfoItem({ label, value }: {label: string;value: string;}) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="mt-0.5 text-sm font-bold text-ink-900">{value}</dd>
    </div>);

}