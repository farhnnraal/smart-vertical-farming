import React, { useState } from 'react';
import { DatabaseIcon, Loader2Icon, RotateCcwIcon, WifiOffIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { PageHeader } from '../components/PageHeader';
import { DemoScenarioPicker } from '../components/DemoScenarioPicker';
import { PARAMETERS, PARAMETER_ORDER } from '../data/parameters';
import { FirebaseConfigForm } from '../types';
import { formatNumber } from '../utils/format';

const FIREBASE_FIELDS: {key: keyof FirebaseConfigForm;label: string;hint: string;}[] = [
{ key: 'projectId', label: 'Project ID', hint: 'Contoh: smart-vertical-farming' },
{ key: 'apiKey', label: 'API Key', hint: 'Kunci akses dari konsol Firebase' },
{ key: 'authDomain', label: 'Auth Domain', hint: 'Contoh: nama-proyek.firebaseapp.com' },
{
  key: 'databaseURL',
  label: 'Database URL',
  hint: 'Alamat Realtime Database tempat data sensor disimpan'
},
{ key: 'appId', label: 'App ID', hint: 'Pengenal aplikasi pada proyek Firebase' }];


export function Pengaturan() {
  const {
    firebaseConfig,
    setFirebaseConfig,
    tryConnect,
    connecting,
    connectionState,
    connectionMessage,
    plant,
    updatePlant,
    targets,
    updateTarget,
    resetTargets,
    demoMode
  } = useFarm();

  const [savedPlant, setSavedPlant] = useState(false);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Pengaturan"
        title="Pengaturan"
        description="Atur koneksi data, informasi tanaman, dan rentang parameter yang dipakai sistem." />
      

      {/* Koneksi Data */}
      <section
        aria-labelledby="koneksi-data"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2
          id="koneksi-data"
          className="flex items-center gap-2 text-base font-extrabold text-ink-900">
          
          <DatabaseIcon className="h-4.5 w-4.5 text-leaf-600" aria-hidden="true" />
          Koneksi Data
        </h2>

        <div
          className={`mt-3 flex items-start gap-3 rounded-xl border px-4 py-3 ${
          connectionState === 'terhubung' ?
          'border-[#bcddc7] bg-[#eaf5ed]' :
          'border-[#f0d9ad] bg-[#fdf3e3]'}`
          }>
          
          <WifiOffIcon
            className={`mt-0.5 h-4.5 w-4.5 flex-none ${
            connectionState === 'terhubung' ? 'text-[#2f7d4f]' : 'text-[#9a5f05]'}`
            }
            aria-hidden="true" />
          
          <div>
            <p className="text-[13px] font-extrabold text-ink-900">
              Status Firebase:{' '}
              {connectionState === 'terhubung' ?
              'Terhubung' :
              connectionState === 'menghubungkan' ?
              'Menghubungkan...' :
              'Belum terhubung'}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{connectionMessage}</p>
            {demoMode &&
            <p className="mt-1 text-[13px] font-semibold text-[#9a5f05]">
                Mode Demo aktif — seluruh nilai sensor adalah data simulasi.
              </p>
            }
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FIREBASE_FIELDS.map((field) =>
          <div key={field.key}>
              <label htmlFor={`fb-${field.key}`} className="text-[13px] font-bold text-ink-700">
                {field.label}
              </label>
              <input
              id={`fb-${field.key}`}
              type="text"
              value={firebaseConfig[field.key]}
              onChange={(event) =>
              setFirebaseConfig({ ...firebaseConfig, [field.key]: event.target.value })
              }
              placeholder={field.hint}
              className="mt-1.5 min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900" />
            
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={tryConnect}
          disabled={connecting}
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700 disabled:opacity-70 sm:w-auto">
          
          {connecting ?
          <>
              <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
              Memuat data...
            </> :

          'Hubungkan'
          }
        </button>
        <p className="mt-2 text-xs leading-relaxed text-ink-400">
          Struktur data yang disiapkan: sensors, plant, growth, actions, dan system. Saat koneksi
          belum tersedia, sistem otomatis menampilkan data simulasi.
        </p>
      </section>

      <DemoScenarioPicker />

      {/* Tanaman */}
      <section
        aria-labelledby="pengaturan-tanaman"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="pengaturan-tanaman" className="text-base font-extrabold text-ink-900">
          Tanaman
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="plant-name" className="text-[13px] font-bold text-ink-700">
              Nama tanaman
            </label>
            <input
              id="plant-name"
              type="text"
              value={plant.name}
              onChange={(event) => {
                updatePlant({ name: event.target.value });
                setSavedPlant(true);
              }}
              className="mt-1.5 min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900" />
            
          </div>
          <div>
            <label htmlFor="plant-date" className="text-[13px] font-bold text-ink-700">
              Tanggal tanam
            </label>
            <input
              id="plant-date"
              type="date"
              value={plant.plantingDate}
              onChange={(event) => {
                updatePlant({ plantingDate: event.target.value });
                setSavedPlant(true);
              }}
              className="mt-1.5 min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900" />
            
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="plant-variety" className="text-[13px] font-bold text-ink-700">
              Varietas
            </label>
            <input
              id="plant-variety"
              type="text"
              value={plant.variety}
              onChange={(event) => {
                updatePlant({ variety: event.target.value });
                setSavedPlant(true);
              }}
              className="mt-1.5 min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900" />
            
          </div>
        </div>
        {savedPlant &&
        <p role="status" className="mt-3 text-[13px] font-semibold text-leaf-700">
            Perubahan tersimpan otomatis.
          </p>
        }
      </section>

      {/* Parameter */}
      <section
        aria-labelledby="pengaturan-parameter"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="pengaturan-parameter" className="text-base font-extrabold text-ink-900">
              Rentang Target Parameter
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
              Rentang ini dipakai sistem untuk menilai status dan menyusun rekomendasi.
            </p>
          </div>
          <button
            type="button"
            onClick={resetTargets}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-leaf-200 px-4 text-sm font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
            
            <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
            Kembalikan bawaan
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {PARAMETER_ORDER.map((key) => {
            const config = PARAMETERS[key];
            const target = targets[key];
            const step = config.unit === 'lux' ? 100 : config.decimals ? 0.1 : 1;
            return (
              <li
                key={key}
                className="flex flex-wrap items-end gap-3 rounded-xl border border-leaf-100 p-3.5">
                
                <div className="min-w-[9rem] flex-1">
                  <p className="text-sm font-bold text-ink-900">{config.label}</p>
                  <p className="text-xs text-ink-400">
                    Bawaan {formatNumber(config.min, config.decimals)}–
                    {formatNumber(config.max, config.decimals)}
                    {config.unit ? ` ${config.unit}` : ''}
                  </p>
                </div>
                <div className="w-[6.5rem]">
                  <label
                    htmlFor={`min-${key}`}
                    className="text-[11px] font-bold uppercase text-ink-400">
                    
                    Minimum
                  </label>
                  <input
                    id={`min-${key}`}
                    type="number"
                    step={step}
                    value={target.min}
                    onChange={(event) =>
                    updateTarget(key, Number(event.target.value), target.max)
                    }
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-leaf-100 px-2.5 text-sm text-ink-900" />
                  
                </div>
                <div className="w-[6.5rem]">
                  <label
                    htmlFor={`max-${key}`}
                    className="text-[11px] font-bold uppercase text-ink-400">
                    
                    Maksimum
                  </label>
                  <input
                    id={`max-${key}`}
                    type="number"
                    step={step}
                    value={target.max}
                    onChange={(event) =>
                    updateTarget(key, target.min, Number(event.target.value))
                    }
                    className="mt-1 min-h-[44px] w-full rounded-xl border border-leaf-100 px-2.5 text-sm text-ink-900" />
                  
                </div>
              </li>);

          })}
        </ul>
      </section>

      {/* Tentang Sistem */}
      <section
        aria-labelledby="tentang-sistem"
        className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
        
        <h2 id="tentang-sistem" className="text-base font-extrabold text-ink-900">
          Tentang Sistem
        </h2>
        <p className="mt-2 text-[13px] font-semibold leading-relaxed text-ink-900">
          Smart Vertical Farming: Sistem Pendukung Keputusan Budidaya Pakcoy untuk Optimalisasi
          Pertanian pada Lahan Perkotaan Terbatas
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
          Prototipe sistem pendukung keputusan budidaya pakcoy berbasis data sensor. Sistem
          melakukan pemantauan, analisis berbasis aturan, penyusunan prioritas tindakan, serta
          pencatatan pertumbuhan dan evaluasi siklus budidaya. Data sensor disiapkan untuk terhubung
          dengan perangkat ESP32 melalui Firebase Realtime Database.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-ink-400">Versi</dt>
            <dd className="mt-0.5 font-bold text-ink-900">1.0.0 (prototipe)</dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
              Metode analisis
            </dt>
            <dd className="mt-0.5 font-bold text-ink-900">Rule-based + pembobotan</dd>
          </div>
        </dl>
      </section>
    </div>);

}