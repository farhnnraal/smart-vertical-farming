import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PARAMETERS, PARAMETER_ORDER } from '../data/parameters';
import { DEFAULT_SCENARIO_ID, DEMO_SCENARIOS } from '../data/demoScenarios';
import { GROWTH_RECORDS } from '../data/growth';
import { PLANT_PROFILE } from '../data/plant';
import {
  ActivityRecord,
  ActivityType,
  DecisionResult,
  FirebaseConfigForm,
  GrowthRecord,
  ParameterEvaluation,
  ParameterKey,
  ParameterTarget,
  PlantProfile } from
'../types';
import { runDecisionEngine } from '../utils/decisionEngine';
import { buildAllHistories, HistoryPoint } from '../utils/sensorHistory';
import {
  ConnectionState,
  connectToFirebase,
  EMPTY_FIREBASE_CONFIG } from
'../services/firebaseService';

const DEFAULT_TARGETS = Object.fromEntries(
  PARAMETER_ORDER.map((key) => [
  key,
  {
    min: PARAMETERS[key].min,
    max: PARAMETERS[key].max,
    warnMin: PARAMETERS[key].warnMin,
    warnMax: PARAMETERS[key].warnMax
  } as ParameterTarget]
  )
) as Record<ParameterKey, ParameterTarget>;

const INITIAL_ACTIVITIES: ActivityRecord[] = [
{
  id: 'a-1',
  type: 'pertumbuhan',
  title: 'Catatan pertumbuhan hari ke-21 ditambahkan',
  detail: 'Tinggi 14 cm, jumlah daun 9.',
  timestamp: Date.now() - 1000 * 60 * 60 * 5
},
{
  id: 'a-2',
  type: 'tindakan',
  title: 'Penyiraman selesai dilakukan',
  detail: 'Kelembapan tanah kembali ke rentang 60–80%.',
  timestamp: Date.now() - 1000 * 60 * 60 * 9,
  parameter: 'soilMoisture'
},
{
  id: 'a-3',
  type: 'peringatan',
  title: 'Peringatan: kelembapan tanah turun',
  detail: 'Nilai 41% berada di bawah rentang yang disarankan.',
  timestamp: Date.now() - 1000 * 60 * 60 * 11,
  parameter: 'soilMoisture'
},
{
  id: 'a-4',
  type: 'tindakan',
  title: 'Rak dipindahkan ke area lebih terang',
  detail: 'Menindaklanjuti rekomendasi intensitas cahaya rendah.',
  timestamp: Date.now() - 1000 * 60 * 60 * 30,
  parameter: 'light'
}];


interface FarmContextValue {
  demoMode: boolean;
  scenarioId: string;
  scenarioName: string;
  setScenario: (id: string) => void;
  connectionState: ConnectionState;
  connectionMessage: string;
  firebaseConfig: FirebaseConfigForm;
  setFirebaseConfig: (config: FirebaseConfigForm) => void;
  tryConnect: () => Promise<void>;
  connecting: boolean;
  readings: Record<ParameterKey, number>;
  lastUpdate: number;
  refreshReadings: () => void;
  histories: Record<ParameterKey, HistoryPoint[]>;
  decision: DecisionResult;
  targets: Record<ParameterKey, ParameterTarget>;
  updateTarget: (key: ParameterKey, min: number, max: number) => void;
  resetTargets: () => void;
  doneActions: string[];
  isActionDone: (evaluation: ParameterEvaluation) => boolean;
  completeAction: (evaluation: ParameterEvaluation) => void;
  plant: PlantProfile;
  updatePlant: (patch: Partial<PlantProfile>) => void;
  growth: GrowthRecord[];
  addGrowth: (record: Omit<GrowthRecord, 'id' | 'day'>) => void;
  activities: ActivityRecord[];
  addActivity: (
  type: ActivityType,
  title: string,
  detail: string,
  parameter?: ParameterKey)
  => void;
}

const FarmContext = createContext<FarmContextValue | null>(null);

export function FarmProvider({ children }: {children: React.ReactNode;}) {
  const [scenarioId, setScenarioId] = useState(DEFAULT_SCENARIO_ID);
  const [seed, setSeed] = useState(3);
  const [lastUpdate, setLastUpdate] = useState(() => Date.now());
  const [targets, setTargets] = useState(DEFAULT_TARGETS);
  const [doneActions, setDoneActions] = useState<string[]>([]);
  const [plant, setPlant] = useState(PLANT_PROFILE);
  const [growth, setGrowth] = useState(GROWTH_RECORDS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [firebaseConfig, setFirebaseConfig] = useState(EMPTY_FIREBASE_CONFIG);
  const [connectionState, setConnectionState] = useState<ConnectionState>('terputus');
  const [connectionMessage, setConnectionMessage] = useState(
    'Firebase belum terhubung. Sistem menampilkan data simulasi.'
  );
  const [connecting, setConnecting] = useState(false);

  const scenario = useMemo(
    () => DEMO_SCENARIOS.find((item) => item.id === scenarioId) ?? DEMO_SCENARIOS[0],
    [scenarioId]
  );

  const readings = scenario.readings;
  const histories = useMemo(() => buildAllHistories(readings, seed), [readings, seed]);
  const decision = useMemo(() => runDecisionEngine(readings, targets), [readings, targets]);

  const addActivity = useCallback(
    (type: ActivityType, title: string, detail: string, parameter?: ParameterKey) => {
      setActivities((prev) => [
      {
        id: `a-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        type,
        title,
        detail,
        parameter,
        timestamp: Date.now()
      },
      ...prev]
      );
    },
    []
  );

  const setScenario = useCallback(
    (id: string) => {
      const next = DEMO_SCENARIOS.find((item) => item.id === id);
      if (!next) return;
      setScenarioId(id);
      setSeed((prev) => prev + 5);
      setLastUpdate(Date.now());
      setDoneActions([]);
      addActivity('sensor', `Skenario demo diubah: ${next.name}`, next.note);
    },
    [addActivity]
  );

  const refreshReadings = useCallback(() => {
    setSeed((prev) => prev + 3);
    setLastUpdate(Date.now());
  }, []);

  const actionKey = useCallback(
    (evaluation: ParameterEvaluation) => `${scenarioId}:${evaluation.parameter}`,
    [scenarioId]
  );

  const isActionDone = useCallback(
    (evaluation: ParameterEvaluation) => doneActions.includes(actionKey(evaluation)),
    [doneActions, actionKey]
  );

  const completeAction = useCallback(
    (evaluation: ParameterEvaluation) => {
      const key = actionKey(evaluation);
      setDoneActions((prev) => prev.includes(key) ? prev : [...prev, key]);
      addActivity(
        'tindakan',
        `Tindakan selesai: ${evaluation.label}`,
        evaluation.recommendation,
        evaluation.parameter
      );
    },
    [actionKey, addActivity]
  );

  const updateTarget = useCallback((key: ParameterKey, min: number, max: number) => {
    setTargets((prev) => {
      const base = prev[key];
      const safeMin = Number.isFinite(min) ? min : base.min;
      const safeMax = Number.isFinite(max) ? max : base.max;
      const span = Math.max(safeMax - safeMin, 0.1);
      return {
        ...prev,
        [key]: {
          min: safeMin,
          max: safeMax,
          warnMin: safeMin - span * 1.25,
          warnMax: safeMax + span * 0.5
        }
      };
    });
  }, []);

  const resetTargets = useCallback(() => setTargets(DEFAULT_TARGETS), []);

  const updatePlant = useCallback((patch: Partial<PlantProfile>) => {
    setPlant((prev) => ({ ...prev, ...patch }));
  }, []);

  const addGrowth = useCallback(
    (record: Omit<GrowthRecord, 'id' | 'day'>) => {
      setGrowth((prev) => {
        const start = new Date(plant.plantingDate).getTime();
        const current = new Date(record.date).getTime();
        const day = Number.isNaN(start) || Number.isNaN(current) ?
        prev.length + 1 :
        Math.max(1, Math.floor((current - start) / 86400000) + 1);
        const next: GrowthRecord = {
          ...record,
          id: `g-${Date.now()}`,
          day
        };
        return [...prev, next].sort((a, b) => a.day - b.day);
      });
      addActivity(
        'pertumbuhan',
        'Catatan pertumbuhan baru ditambahkan',
        `Tinggi ${record.height} cm, jumlah daun ${record.leafCount}.`
      );
    },
    [addActivity, plant.plantingDate]
  );

  const tryConnect = useCallback(async () => {
    setConnecting(true);
    setConnectionState('menghubungkan');
    setConnectionMessage('Mencoba menghubungkan ke server data...');
    const result = await connectToFirebase(firebaseConfig);
    setConnectionState(result.state);
    setConnectionMessage(result.message);
    setConnecting(false);
  }, [firebaseConfig]);

  const value: FarmContextValue = {
    demoMode: connectionState !== 'terhubung',
    scenarioId,
    scenarioName: scenario.name,
    setScenario,
    connectionState,
    connectionMessage,
    firebaseConfig,
    setFirebaseConfig,
    tryConnect,
    connecting,
    readings,
    lastUpdate,
    refreshReadings,
    histories,
    decision,
    targets,
    updateTarget,
    resetTargets,
    doneActions,
    isActionDone,
    completeAction,
    plant,
    updatePlant,
    growth,
    addGrowth,
    activities,
    addActivity
  };

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
}

export function useFarm(): FarmContextValue {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm harus dipakai di dalam FarmProvider');
  }
  return context;
}