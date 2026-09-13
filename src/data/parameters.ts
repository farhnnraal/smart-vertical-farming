import { ParameterConfig, ParameterKey } from '../types';

/**
 * Konfigurasi parameter budidaya pakcoy.
 * Rentang di sini menjadi dasar aturan (rule-based) pada mesin keputusan
 * dan dapat diubah pengguna melalui halaman Pengaturan.
 */
export const PARAMETERS: Record<ParameterKey, ParameterConfig> = {
  soilMoisture: {
    key: 'soilMoisture',
    label: 'Kelembapan Tanah',
    shortLabel: 'Kelembapan',
    unit: '%',
    decimals: 0,
    weight: 0.25,
    min: 60,
    max: 80,
    warnMin: 35,
    warnMax: 90,
    chartMin: 20,
    chartMax: 100,
    description: 'Kadar air pada media tanam tempat akar pakcoy tumbuh.',
    impact:
    'Media yang terlalu kering membuat daun pakcoy layu dan pertumbuhan melambat, sedangkan terlalu basah berisiko membuat akar busuk.',
    messages: {
      low: 'Tanah mulai terlalu kering.',
      high: 'Media tanam terlalu basah.'
    },
    recommendations: {
      low: 'Periksa media tanam dan lakukan penyiraman sesuai kebutuhan.',
      high: 'Kurangi penyiraman dan periksa aliran pembuangan air pada rak.'
    }
  },
  temperature: {
    key: 'temperature',
    label: 'Suhu',
    shortLabel: 'Suhu',
    unit: '°C',
    decimals: 1,
    weight: 0.2,
    min: 20,
    max: 28,
    warnMin: 15,
    warnMax: 33,
    chartMin: 12,
    chartMax: 40,
    description: 'Suhu udara di sekitar rak tanam.',
    impact:
    'Suhu yang terlalu panas membuat pakcoy cepat berbunga dan daun mengecil, suhu terlalu dingin memperlambat pertumbuhan.',
    messages: {
      low: 'Suhu lingkungan terlalu dingin.',
      high: 'Suhu lingkungan terlalu panas.'
    },
    recommendations: {
      low: 'Kurangi aliran udara dingin atau pindahkan rak ke area yang lebih hangat.',
      high: 'Periksa sirkulasi udara dan tambahkan naungan pada rak.'
    }
  },
  airHumidity: {
    key: 'airHumidity',
    label: 'Kelembapan Udara',
    shortLabel: 'Kelembapan Udara',
    unit: '%',
    decimals: 0,
    weight: 0.15,
    min: 60,
    max: 80,
    warnMin: 45,
    warnMax: 92,
    chartMin: 30,
    chartMax: 100,
    description: 'Kadar uap air di udara sekitar tanaman.',
    impact:
    'Udara terlalu kering mempercepat penguapan sehingga daun mudah mengering, udara terlalu lembap memicu jamur.',
    messages: {
      low: 'Udara di sekitar tanaman terlalu kering.',
      high: 'Udara di sekitar tanaman terlalu lembap.'
    },
    recommendations: {
      low: 'Tingkatkan kelembapan udara, misalnya dengan pengabutan ringan di sekitar rak.',
      high: 'Perbaiki sirkulasi udara agar kelembapan tidak berlebihan.'
    }
  },
  light: {
    key: 'light',
    label: 'Intensitas Cahaya',
    shortLabel: 'Cahaya',
    unit: 'lux',
    decimals: 0,
    weight: 0.25,
    min: 5000,
    max: 15000,
    warnMin: 2500,
    warnMax: 20000,
    chartMin: 0,
    chartMax: 22000,
    description: 'Banyaknya cahaya yang diterima daun pakcoy.',
    impact:
    'Cahaya yang cukup membantu proses fotosintesis. Cahaya kurang membuat batang memanjang dan daun pucat.',
    messages: {
      low: 'Intensitas cahaya masih rendah.',
      high: 'Intensitas cahaya terlalu tinggi.'
    },
    recommendations: {
      low: 'Pindahkan rak ke area dengan pencahayaan lebih optimal atau nyalakan lampu tanam.',
      high: 'Tambahkan naungan agar daun pakcoy tidak terbakar.'
    }
  },
  ph: {
    key: 'ph',
    label: 'pH Media Tanam',
    shortLabel: 'pH',
    unit: '',
    decimals: 1,
    weight: 0.15,
    min: 5.5,
    max: 7,
    warnMin: 5,
    warnMax: 7.5,
    chartMin: 4,
    chartMax: 9,
    description: 'Tingkat keasaman media tanam atau larutan nutrisi.',
    impact:
    'pH di luar rentang membuat akar sulit menyerap nutrisi walaupun nutrisi tersedia.',
    messages: {
      low: 'pH media tanam terlalu asam.',
      high: 'pH media tanam terlalu basa.'
    },
    recommendations: {
      low: 'Periksa dan sesuaikan pH media tanam agar mendekati rentang yang disarankan.',
      high: 'Periksa larutan nutrisi dan sesuaikan pH media tanam.'
    }
  }
};

export const PARAMETER_ORDER: ParameterKey[] = [
'soilMoisture',
'temperature',
'airHumidity',
'light',
'ph'];