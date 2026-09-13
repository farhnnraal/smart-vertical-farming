import { DemoScenario } from '../types';

/**
 * Skenario Mode Demo. Seluruh nilai di sini adalah DATA SIMULASI
 * yang dipakai untuk memperagakan alur sistem pendukung keputusan
 * sebelum sensor ESP32 terhubung.
 */
export const DEMO_SCENARIOS: DemoScenario[] = [
{
  id: 'optimal',
  name: 'Kondisi Optimal',
  note: 'Semua parameter berada di dalam rentang yang disarankan.',
  readings: { soilMoisture: 68, temperature: 27, airHumidity: 72, light: 6200, ph: 6.2 }
},
{
  id: 'tanah-kering',
  name: 'Tanah Kering',
  note: 'Kelembapan media tanam turun jauh di bawah rentang.',
  readings: { soilMoisture: 38, temperature: 29, airHumidity: 58, light: 5800, ph: 6.1 }
},
{
  id: 'cahaya-rendah',
  name: 'Cahaya Rendah',
  note: 'Rak berada di area yang kurang mendapat cahaya.',
  readings: { soilMoisture: 65, temperature: 25, airHumidity: 70, light: 1800, ph: 6.3 }
},
{
  id: 'suhu-tinggi',
  name: 'Suhu Tinggi',
  note: 'Suhu lingkungan naik dan udara menjadi kering.',
  readings: { soilMoisture: 55, temperature: 34, airHumidity: 48, light: 9000, ph: 6.2 }
},
{
  id: 'ph-tidak-optimal',
  name: 'pH Tidak Optimal',
  note: 'pH media tanam terlalu asam untuk pakcoy.',
  readings: { soilMoisture: 66, temperature: 26, airHumidity: 70, light: 7000, ph: 4.8 }
},
{
  id: 'multi-masalah',
  name: 'Beberapa Parameter Bermasalah',
  note: 'Beberapa parameter bermasalah bersamaan sehingga perlu diurutkan.',
  readings: { soilMoisture: 33, temperature: 33.5, airHumidity: 44, light: 2200, ph: 7.8 }
}];


export const DEFAULT_SCENARIO_ID = 'optimal';