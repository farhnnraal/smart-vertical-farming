import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { ParameterEvaluation } from '../types';
import { PARAMETERS } from '../data/parameters';
import { STATUS_STYLES } from '../utils/statusStyles';
import { HistoryPoint } from '../utils/sensorHistory';
import { formatNumber } from '../utils/format';

interface SensorChartProps {
  evaluation: ParameterEvaluation;
  data: HistoryPoint[];
  height?: number;
}

/** Tren sensor 6 jam terakhir. Area hijau menandai rentang yang disarankan. */
export function SensorChart({ evaluation, data, height = 190 }: SensorChartProps) {
  const config = PARAMETERS[evaluation.parameter];
  const color = STATUS_STYLES[evaluation.status].chart;
  const values = data.map((point) => point.value);
  const min = Math.min(...values, evaluation.target.min);
  const max = Math.max(...values, evaluation.target.max);
  const pad = Math.max((max - min) * 0.25, config.decimals ? 0.4 : 2);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id={`fill-${evaluation.parameter}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#eff1ed" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#8a9386' }}
            tickLine={false}
            axisLine={{ stroke: '#e4e7e1' }}
            interval="preserveStartEnd"
            minTickGap={24} />
          
          <YAxis
            domain={[Math.floor(min - pad), Math.ceil(max + pad)]}
            tick={{ fontSize: 11, fill: '#8a9386' }}
            tickLine={false}
            axisLine={false}
            width={46}
            tickFormatter={(value: number) => formatNumber(value, evaluation.decimals)} />
          
          <ReferenceArea
            y1={evaluation.target.min}
            y2={evaluation.target.max}
            fill="#2f7d4f"
            fillOpacity={0.07} />
          
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #ddeee2',
              fontSize: 12,
              fontFamily: 'inherit'
            }}
            labelFormatter={(label: string) => `Pukul ${label}`}
            formatter={(value: number) => [
            `${formatNumber(value, evaluation.decimals)}${
            evaluation.unit ? ' ' + evaluation.unit : ''}`,

            evaluation.label]
            } />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#fill-${evaluation.parameter})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false} />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>);

}