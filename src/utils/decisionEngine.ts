import { PARAMETERS, PARAMETER_ORDER } from '../data/parameters';
import {
  DecisionResult,
  Direction,
  ParameterEvaluation,
  ParameterKey,
  ParameterTarget,
  PriorityLevel,
  Status } from
'../types';
import { formatNumber } from './format';

export const STATUS_LABEL: Record<Status, string> = {
  optimal: 'Optimal',
  warning: 'Perlu Perhatian',
  critical: 'Kritis'
};

export const PRIORITY_LABEL: Record<PriorityLevel, string> = {
  tinggi: 'Prioritas Tinggi',
  sedang: 'Prioritas Sedang',
  rendah: 'Prioritas Rendah'
};

/**
 * MESIN KEPUTUSAN (rule-based, tanpa model machine learning).
 *
 * Alur: data sensor → evaluasi tiap parameter → status parameter →
 * skor kondisi tanaman → identifikasi parameter tidak normal →
 * penentuan prioritas → rekomendasi tindakan.
 */
function evaluateParameter(
key: ParameterKey,
value: number,
target: ParameterTarget)
: ParameterEvaluation {
  const config = PARAMETERS[key];
  let status: Status = 'optimal';
  let direction: Direction = 'ok';
  let score = 100;

  if (value < target.min) {
    direction = 'low';
    const span = Math.max(target.min - target.warnMin, 0.0001);
    const distance = target.min - value;
    if (distance <= span) {
      status = 'warning';
      score = Math.round(30 + 40 * (1 - distance / span));
    } else {
      status = 'critical';
      score = Math.round(10 * Math.max(0, 1 - (distance - span) / span));
    }
  } else if (value > target.max) {
    direction = 'high';
    const span = Math.max(target.warnMax - target.max, 0.0001);
    const distance = value - target.max;
    if (distance <= span) {
      status = 'warning';
      score = Math.round(30 + 40 * (1 - distance / span));
    } else {
      status = 'critical';
      score = Math.round(10 * Math.max(0, 1 - (distance - span) / span));
    }
  }

  const rangeText = `${formatNumber(target.min, config.decimals)}–${formatNumber(
    target.max,
    config.decimals
  )}${config.unit ? ' ' + config.unit : ''}`;

  const isIssue = direction !== 'ok';

  return {
    parameter: key,
    label: config.label,
    shortLabel: config.shortLabel,
    value,
    unit: config.unit,
    decimals: config.decimals,
    target,
    status,
    statusLabel: STATUS_LABEL[status],
    direction,
    score,
    weight: config.weight,
    message: isIssue ?
    config.messages[direction as 'low' | 'high'] :
    `${config.label} berada pada rentang yang disarankan.`,
    reason: isIssue ?
    `Nilai ${formatNumber(value, config.decimals)}${
    config.unit ? ' ' + config.unit : ''} berada di ${
    direction === 'low' ? 'bawah' : 'atas'} rentang ${rangeText} yang disarankan untuk pakcoy.` :
    `Nilai berada di dalam rentang ${rangeText} yang disarankan untuk pakcoy.`,
    recommendation: isIssue ?
    config.recommendations[direction as 'low' | 'high'] :
    'Pertahankan kondisi ini dan lanjutkan pemantauan rutin.',
    impact: config.impact,
    description: config.description,
    priority: null,
    rank: null
  };
}

function statusOfScore(score: number): Status {
  if (score >= 80) return 'optimal';
  if (score >= 60) return 'warning';
  return 'critical';
}

function summaryText(score: number, issues: ParameterEvaluation[]): string {
  if (issues.length === 0) {
    return 'Kondisi tanaman saat ini berada dalam kondisi baik. Tidak ada parameter kritis.';
  }
  const names = issues.slice(0, 2).map((item) => item.shortLabel.toLowerCase());
  if (score >= 80) {
    return `Kondisi tanaman masih baik, namun ${names.join(' dan ')} perlu dipantau agar tetap pada rentang yang disarankan.`;
  }
  if (score >= 60) {
    return `Ada ${issues.length} parameter yang perlu perhatian, terutama ${names[0]}. Lakukan tindakan pada daftar prioritas agar kondisi kembali optimal.`;
  }
  return `Kondisi tanaman kritis. ${issues.length} parameter berada di luar rentang yang disarankan dan perlu segera ditangani.`;
}

export function runDecisionEngine(
readings: Record<ParameterKey, number>,
targets: Record<ParameterKey, ParameterTarget>)
: DecisionResult {
  const evaluations = PARAMETER_ORDER.map((key) =>
  evaluateParameter(key, readings[key], targets[key])
  );

  const score = Math.round(
    evaluations.reduce((total, item) => total + item.score * item.weight, 0) /
    evaluations.reduce((total, item) => total + item.weight, 0)
  );

  // Urutkan parameter bermasalah: tingkat keparahan × bobot parameter.
  const issues = evaluations.
  filter((item) => item.status !== 'optimal').
  sort((a, b) => {
    const severity = (item: ParameterEvaluation) => item.status === 'critical' ? 1 : 0;
    if (severity(b) !== severity(a)) return severity(b) - severity(a);
    return (100 - b.score) * b.weight - (100 - a.score) * a.weight;
  }).
  map((item, index) => {
    const priority: PriorityLevel =
    item.status === 'critical' ? 'tinggi' : index === 0 ? 'tinggi' : index === 1 ? 'sedang' : 'rendah';
    const withPriority: ParameterEvaluation = { ...item, priority, rank: index + 1 };
    return withPriority;
  });

  // Sinkronkan prioritas ke daftar evaluasi utama.
  const merged = evaluations.map((item) => {
    const issue = issues.find((candidate) => candidate.parameter === item.parameter);
    return issue ?? item;
  });

  const overallStatus = statusOfScore(score);

  return {
    score,
    status: overallStatus,
    statusLabel: score >= 80 ? 'Kondisi Baik' : score >= 60 ? 'Perlu Perhatian' : 'Kritis',
    summary: summaryText(score, issues),
    evaluations: merged,
    issues,
    mainProblem: issues[0] ?? null
  };
}