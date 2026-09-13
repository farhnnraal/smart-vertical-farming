export type ParameterKey = 'soilMoisture' | 'temperature' | 'airHumidity' | 'light' | 'ph';

export type Status = 'optimal' | 'warning' | 'critical';

export type Direction = 'low' | 'high' | 'ok';

export type PriorityLevel = 'tinggi' | 'sedang' | 'rendah';

export interface ParameterTarget {
  min: number;
  max: number;
  warnMin: number;
  warnMax: number;
}

export interface ParameterConfig extends ParameterTarget {
  key: ParameterKey;
  label: string;
  shortLabel: string;
  unit: string;
  decimals: number;
  weight: number;
  /** Batas sumbu grafik */
  chartMin: number;
  chartMax: number;
  /** Apa ini? */
  description: string;
  /** Dampak terhadap pakcoy */
  impact: string;
  messages: Record<'low' | 'high', string>;
  recommendations: Record<'low' | 'high', string>;
}

export interface ParameterEvaluation {
  parameter: ParameterKey;
  label: string;
  shortLabel: string;
  value: number;
  unit: string;
  decimals: number;
  target: ParameterTarget;
  status: Status;
  statusLabel: string;
  direction: Direction;
  score: number;
  /** Bobot parameter pada skor akhir */
  weight: number;
  message: string;
  reason: string;
  recommendation: string;
  impact: string;
  description: string;
  priority: PriorityLevel | null;
  /** Urutan prioritas, 1 = paling mendesak. null bila normal */
  rank: number | null;
}

export interface DecisionResult {
  score: number;
  status: Status;
  statusLabel: string;
  summary: string;
  evaluations: ParameterEvaluation[];
  issues: ParameterEvaluation[];
  mainProblem: ParameterEvaluation | null;
}

export interface DemoScenario {
  id: string;
  name: string;
  note: string;
  readings: Record<ParameterKey, number>;
}

export interface PlantProfile {
  name: string;
  scientificName: string;
  variety: string;
  plantingDate: string;
  location: string;
  rackLevels: number;
  potsPerLevel: number;
}

export interface GrowthRecord {
  id: string;
  date: string;
  day: number;
  height: number;
  leafCount: number;
  photo?: string;
  note?: string;
}

export interface RackLayer {
  level: number;
  pots: number;
  status: Status;
  note: string;
}

export type ActivityType = 'tindakan' | 'peringatan' | 'rekomendasi' | 'pertumbuhan' | 'sensor';

export interface ActivityRecord {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  timestamp: number;
  parameter?: ParameterKey;
}

export interface FirebaseConfigForm {
  projectId: string;
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  appId: string;
}