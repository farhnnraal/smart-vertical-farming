import day1Photo from './day-1.webp';
import day7Photo from './day-7.webp';
import day14Photo from './day-14.webp';
import day21Photo from './day-21.webp';
import bannerPhoto from './banner.webp';

/**
 * Kumpulan aset gambar yang dipakai aplikasi.
 * Disimpan terpisah agar mudah diganti dengan foto asli dari lapangan.
 */

/** Foto dokumentasi pertumbuhan pakcoy per tahap (data contoh). */
export const GROWTH_PHOTOS = {
  day1: day1Photo,
  day7: day7Photo,
  day14: day14Photo,
  day21: day21Photo,
} as const;

/** Foto rak vertikal 10 tingkat pada halaman Tanaman. */
export const RACK_PHOTO = bannerPhoto;