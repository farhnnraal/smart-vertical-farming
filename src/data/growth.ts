import { GROWTH_PHOTOS } from '../assets/images';
import { GrowthRecord, ParameterKey } from '../types';

/** Catatan pertumbuhan awal (data simulasi untuk peragaan). */
export const GROWTH_RECORDS: GrowthRecord[] = [
{
  id: 'g-1',
  date: '2026-08-22',
  day: 1,
  height: 3,
  leafCount: 2,
  photo: GROWTH_PHOTOS.day1,
  note: 'Bibit dipindahkan ke rak tingkat 5.'
},
{
  id: 'g-2',
  date: '2026-08-28',
  day: 7,
  height: 6,
  leafCount: 4,
  photo: GROWTH_PHOTOS.day7,
  note: 'Daun mulai melebar, penyiraman dua kali sehari.'
},
{
  id: 'g-3',
  date: '2026-09-04',
  day: 14,
  height: 10,
  leafCount: 7,
  photo: GROWTH_PHOTOS.day14,
  note: 'Pertumbuhan terlihat lebih baik setelah kelembapan stabil.'
},
{
  id: 'g-4',
  date: '2026-09-11',
  day: 21,
  height: 14,
  leafCount: 9,
  photo: GROWTH_PHOTOS.day21,
  note: 'Rak dipindahkan ke sisi yang lebih terang.'
}];


/**
 * Rekap siklus budidaya berjalan (data simulasi).
 * Dipakai pada halaman Evaluasi Budidaya.
 */
export const CYCLE_SCORE_LOG: {day: number;score: number;}[] = [
{ day: 1, score: 88 },
{ day: 3, score: 84 },
{ day: 5, score: 71 },
{ day: 7, score: 76 },
{ day: 9, score: 90 },
{ day: 11, score: 93 },
{ day: 13, score: 79 },
{ day: 15, score: 82 },
{ day: 17, score: 95 },
{ day: 19, score: 91 },
{ day: 21, score: 100 }];


export const CYCLE_ISSUE_COUNT: {parameter: ParameterKey;count: number;}[] = [
{ parameter: 'soilMoisture', count: 9 },
{ parameter: 'light', count: 5 },
{ parameter: 'temperature', count: 3 },
{ parameter: 'airHumidity', count: 2 },
{ parameter: 'ph', count: 1 }];


export const CYCLE_BASE_STATS = {
  warnings: 20,
  completedActions: 17
};