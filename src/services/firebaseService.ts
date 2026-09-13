import { FirebaseConfigForm, GrowthRecord, ParameterKey } from '../types';

/**
 * Layanan koneksi data.
 *
 * Struktur data yang disiapkan pada Firebase Realtime Database:
 *
 * sensors/   temperature, soilMoisture, humidity, light, ph
 * plant/     name, scientificName, plantingDate, variety
 * growth/    date, height, leafCount, photo, note
 * actions/   timestamp, parameter, action, priority, status
 * system/    mode, lastUpdate
 *
 * Pada prototipe ini koneksi belum diaktifkan, sehingga aplikasi
 * otomatis memakai data simulasi (Mode Demo). Fungsi di bawah
 * menyiapkan bentuk pemanggilan agar mudah dihubungkan ke sensor ESP32.
 */

export type ConnectionState = 'terputus' | 'menghubungkan' | 'terhubung' | 'gagal';

export interface SensorSnapshot {
  readings: Record<ParameterKey, number>;
  lastUpdate: number;
}

export interface ConnectionResult {
  state: ConnectionState;
  /** Pesan ramah pengguna, bukan pesan galat teknis. */
  message: string;
}

export const FIREBASE_PATHS = {
  sensors: 'sensors',
  plant: 'plant',
  growth: 'growth',
  actions: 'actions',
  system: 'system'
} as const;

export const EMPTY_FIREBASE_CONFIG: FirebaseConfigForm = {
  projectId: '',
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  appId: ''
};

export function isConfigComplete(config: FirebaseConfigForm): boolean {
  return Object.values(config).every((value) => value.trim().length > 0);
}

/** Mengubah galat teknis menjadi pesan yang dapat dipahami pengguna. */
export function friendlyMessage(): string {
  return 'Koneksi data belum tersedia. Sistem sedang menggunakan data simulasi.';
}

/**
 * Mencoba menghubungkan ke Firebase Realtime Database.
 * Selama SDK belum dipasang, fungsi ini selalu mengembalikan status
 * "gagal" dengan pesan ramah pengguna sehingga aplikasi tetap berjalan
 * dengan Mode Demo.
 */
export async function connectToFirebase(
config: FirebaseConfigForm)
: Promise<ConnectionResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (!isConfigComplete(config)) {
    return {
      state: 'gagal',
      message: 'Data koneksi belum lengkap. Lengkapi semua kolom terlebih dahulu.'
    };
  }
  return {
    state: 'gagal',
    message:
    'Server data belum merespons. Sistem tetap berjalan dengan data simulasi sampai sensor terhubung.'
  };
}

/** Tempat penulisan catatan pertumbuhan ke Firebase saat koneksi aktif. */
export async function pushGrowthRecord(record: GrowthRecord): Promise<void> {
  void record;
  return Promise.resolve();
}