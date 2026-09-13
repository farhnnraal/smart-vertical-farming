import React, { useRef, useState } from 'react';
import { ImagePlusIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { todayISO } from '../utils/format';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MB

/** Formulir catatan pertumbuhan: tanggal, tinggi, jumlah daun, foto, catatan. */
export function GrowthForm() {
  const { addGrowth } = useFarm();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO());
  const [height, setHeight] = useState('');
  const [leafCount, setLeafCount] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setHeight('');
    setLeafCount('');
    setNote('');
    setError('');
    removePhoto();
  };

  const removePhoto = () => {
    setPhoto('');
    setPhotoName('');
    setPhotoError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onPickPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Berkas yang dipilih bukan gambar. Gunakan foto berformat JPG atau PNG.');
      removePhoto();
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Ukuran foto melebihi 5 MB. Pilih foto dengan ukuran lebih kecil.');
      removePhoto();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(typeof reader.result === 'string' ? reader.result : '');
      setPhotoName(file.name);
      setPhotoError('');
    };
    reader.onerror = () => {
      setPhotoError('Foto gagal dibaca. Coba pilih foto lain.');
      removePhoto();
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedHeight = Number(height);
    const parsedLeaf = Number(leafCount);
    if (!date || !height || !leafCount) {
      setError('Tanggal, tinggi, dan jumlah daun wajib diisi.');
      return;
    }
    if (parsedHeight <= 0 || parsedLeaf <= 0) {
      setError('Tinggi dan jumlah daun harus lebih besar dari 0.');
      return;
    }
    addGrowth({
      date,
      height: parsedHeight,
      leafCount: parsedLeaf,
      photo: photo || undefined,
      note: note.trim() || undefined
    });
    reset();
    setSaved(true);
    setOpen(false);
    window.setTimeout(() => setSaved(false), 2600);
  };

  if (!open) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700 sm:w-auto">
          
          <PlusIcon className="h-4.5 w-4.5" aria-hidden="true" />
          Tambah Catatan Pertumbuhan
        </button>
        {saved &&
        <p role="status" className="text-[13px] font-semibold text-leaf-700">
            Catatan pertumbuhan berhasil disimpan.
          </p>
        }
      </div>);

  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
      
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-ink-900">Catatan Pertumbuhan Baru</h3>
          <p className="mt-0.5 text-[13px] text-ink-500">
            Catat pengukuran hari ini agar perkembangan pakcoy dapat dibandingkan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          aria-label="Tutup formulir"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink-500 transition-colors duration-150 hover:bg-canvas-sunken">
          
          <XIcon className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Tanggal" htmlFor="growth-date">
          <input
            id="growth-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900"
            required />
          
        </Field>
        <Field label="Tinggi tanaman (cm)" htmlFor="growth-height">
          <input
            id="growth-height"
            type="number"
            inputMode="decimal"
            min={0}
            step="0.5"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Contoh: 12"
            className="min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900"
            required />
          
        </Field>
        <Field label="Jumlah daun" htmlFor="growth-leaf">
          <input
            id="growth-leaf"
            type="number"
            inputMode="numeric"
            min={0}
            step="1"
            value={leafCount}
            onChange={(event) => setLeafCount(event.target.value)}
            placeholder="Contoh: 8"
            className="min-h-[46px] w-full rounded-xl border border-leaf-100 bg-white px-3 text-sm text-ink-900"
            required />
          
        </Field>
        <div className="sm:col-span-2">
          <Field label="Foto tanaman (opsional)" htmlFor="growth-photo">
            <input
              ref={fileInputRef}
              id="growth-photo"
              type="file"
              accept="image/*"
              onChange={onPickPhoto}
              className="sr-only" />
            
            {photo ?
            <div className="flex items-center gap-3 rounded-xl border border-leaf-100 p-3">
                <img
                src={photo}
                alt="Pratinjau foto tanaman yang dipilih"
                className="h-20 w-20 flex-none rounded-xl object-cover" />
              
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-ink-900">{photoName}</p>
                  <p className="mt-0.5 text-xs text-ink-500">Foto siap disimpan.</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-leaf-200 px-3 text-[13px] font-bold text-leaf-700 transition-colors duration-150 hover:bg-leaf-50">
                    
                      <ImagePlusIcon className="h-4 w-4" aria-hidden="true" />
                      Ganti foto
                    </button>
                    <button
                    type="button"
                    onClick={removePhoto}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-leaf-200 px-3 text-[13px] font-bold text-ink-700 transition-colors duration-150 hover:bg-canvas-sunken">
                    
                      <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                      Hapus foto
                    </button>
                  </div>
                </div>
              </div> :

            <label
              htmlFor="growth-photo"
              className="flex min-h-[92px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-leaf-200 bg-leaf-50/60 px-4 py-4 text-center transition-colors duration-150 hover:bg-leaf-50">
              
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-leaf-600">
                  <ImagePlusIcon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="text-[13px] font-bold text-ink-900">
                  Unggah foto dari perangkat
                </span>
                <span className="text-xs text-ink-500">
                  Ketuk untuk memilih foto atau memotret langsung · JPG atau PNG, maksimal 5 MB
                </span>
              </label>
            }
            {photoError &&
            <p
              role="alert"
              className="mt-2 rounded-xl bg-[#fdeeec] px-3.5 py-2.5 text-[13px] font-semibold text-[#b03426]">
              
                {photoError}
              </p>
            }
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Catatan (opsional)" htmlFor="growth-note">
            <textarea
              id="growth-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={2}
              placeholder="Contoh: Pertumbuhan terlihat lebih baik setelah kelembapan stabil."
              className="w-full rounded-xl border border-leaf-100 bg-white px-3 py-2.5 text-sm text-ink-900" />
            
          </Field>
        </div>
      </div>

      {error &&
      <p role="alert" className="mt-3 rounded-xl bg-[#fdeeec] px-3.5 py-2.5 text-[13px] font-semibold text-[#b03426]">
          {error}
        </p>
      }

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="min-h-[48px] flex-1 rounded-xl bg-leaf-600 px-4 text-sm font-bold text-white transition-colors duration-150 hover:bg-leaf-700">
          
          Simpan
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="min-h-[48px] flex-1 rounded-xl border border-leaf-200 px-4 text-sm font-bold text-ink-700 transition-colors duration-150 hover:bg-canvas-sunken">
          
          Batal
        </button>
      </div>
    </form>);

}

function Field({
  label,
  htmlFor,
  children




}: {label: string;htmlFor: string;children: React.ReactNode;}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[13px] font-bold text-ink-700">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>);

}