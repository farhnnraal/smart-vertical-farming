import { PARAMETERS, PARAMETER_ORDER } from '../data/parameters';
import { ParameterKey } from '../types';

export interface HistoryPoint {
  /** Label jam, contoh "09.30" */
  label: string;
  value: number;
}

/** Pseudo-random deterministik agar tren tidak berubah setiap render. */
function seeded(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Membentuk tren 12 titik terakhir (interval 30 menit) yang berakhir
 * pada nilai sensor saat ini. Data tren ini merupakan simulasi dan akan
 * digantikan riwayat dari Firebase Realtime Database saat sensor terhubung.
 */
export function buildHistory(
key: ParameterKey,
currentValue: number,
seedOffset: number,
points = 12)
: HistoryPoint[] {
  const config = PARAMETERS[key];
  const amplitude = (config.max - config.min) * 0.35 || 1;
  const now = Date.now();
  const result: HistoryPoint[] = [];

  for (let i = points - 1; i >= 0; i -= 1) {
    const time = new Date(now - i * 30 * 60 * 1000);
    const label = `${String(time.getHours()).padStart(2, '0')}.${String(
      time.getMinutes()
    ).padStart(2, '0')}`;
    const drift = (seeded(i * 7.3 + seedOffset) - 0.5) * amplitude;
    const easeToNow = 1 - i / (points - 1);
    const raw = currentValue - drift * (1 - easeToNow) - drift * 0.2;
    const value = i === 0 ? currentValue : raw;
    result.push({
      label,
      value: Number(
        Math.max(config.chartMin, Math.min(config.chartMax, value)).toFixed(config.decimals)
      )
    });
  }
  return result;
}

export function buildAllHistories(
readings: Record<ParameterKey, number>,
seedOffset: number)
: Record<ParameterKey, HistoryPoint[]> {
  const entries = PARAMETER_ORDER.map((key, index) => [
  key,
  buildHistory(key, readings[key], seedOffset + index * 11)]
  );
  return Object.fromEntries(entries) as Record<ParameterKey, HistoryPoint[]>;
}