import { Status } from '../types';

export interface StatusStyle {
  label: string;
  text: string;
  bg: string;
  border: string;
  dot: string;
  chart: string;
}

export const STATUS_STYLES: Record<Status, StatusStyle> = {
  optimal: {
    label: 'Optimal',
    text: 'text-[#2f7d4f]',
    bg: 'bg-[#eaf5ed]',
    border: 'border-[#bcddc7]',
    dot: 'bg-[#2f7d4f]',
    chart: '#2f7d4f'
  },
  warning: {
    label: 'Perlu Perhatian',
    text: 'text-[#9a5f05]',
    bg: 'bg-[#fdf3e3]',
    border: 'border-[#f0d9ad]',
    dot: 'bg-[#c98010]',
    chart: '#c98010'
  },
  critical: {
    label: 'Kritis',
    text: 'text-[#b03426]',
    bg: 'bg-[#fdeeec]',
    border: 'border-[#f2c9c3]',
    dot: 'bg-[#c0392b]',
    chart: '#c0392b'
  }
};