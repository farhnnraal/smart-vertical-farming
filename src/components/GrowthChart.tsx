import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { GrowthRecord } from '../types';

/** Tren tinggi tanaman dan jumlah daun per hari pengukuran. */
export function GrowthChart({ records }: {records: GrowthRecord[];}) {
  const data = [...records].
  sort((a, b) => a.day - b.day).
  map((record) => ({
    day: `Hari ${record.day}`,
    tinggi: record.height,
    daun: record.leafCount
  }));

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid stroke="#eff1ed" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: '#8a9386' }}
            tickLine={false}
            axisLine={{ stroke: '#e4e7e1' }}
            minTickGap={16} />
          
          <YAxis
            tick={{ fontSize: 11, fill: '#8a9386' }}
            tickLine={false}
            axisLine={false}
            width={40} />
          
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #ddeee2',
              fontSize: 12,
              fontFamily: 'inherit'
            }}
            formatter={(value: number, name: string) => [
            name === 'tinggi' ? `${value} cm` : `${value} daun`,
            name === 'tinggi' ? 'Tinggi tanaman' : 'Jumlah daun']
            } />
          
          <Line
            type="monotone"
            dataKey="tinggi"
            stroke="#2f7d4f"
            strokeWidth={2.5}
            dot={{ r: 3, strokeWidth: 0, fill: '#2f7d4f' }}
            isAnimationActive={false} />
          
          <Line
            type="monotone"
            dataKey="daun"
            stroke="#1f6fb2"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 3, strokeWidth: 0, fill: '#1f6fb2' }}
            isAnimationActive={false} />
          
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-leaf-600" aria-hidden="true" />
          Tinggi tanaman (cm)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1f6fb2]" aria-hidden="true" />
          Jumlah daun
        </span>
      </div>
    </div>);

}