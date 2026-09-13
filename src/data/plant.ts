import { PlantProfile, RackLayer } from '../types';

export const PLANT_PROFILE: PlantProfile = {
  name: 'Pakcoy',
  scientificName: 'Brassica rapa L.',
  variety: 'Pakcoy Nauli F1',
  plantingDate: '2026-08-22',
  location: 'Rak vertikal 10 tingkat — balkon rumah, lahan 1,2 m²',
  rackLevels: 10,
  potsPerLevel: 8
};

/** Kondisi tiap tingkat rak (data simulasi). */
export const RACK_LAYERS: RackLayer[] = [
{ level: 10, pots: 8, status: 'optimal', note: 'Cahaya paling banyak diterima.' },
{ level: 9, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 8, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 7, pots: 8, status: 'warning', note: 'Daun mulai memanjang, cahaya kurang.' },
{ level: 6, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 5, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 4, pots: 8, status: 'warning', note: 'Media tanam lebih cepat kering.' },
{ level: 3, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 2, pots: 8, status: 'optimal', note: 'Pertumbuhan merata.' },
{ level: 1, pots: 6, status: 'critical', note: 'Paling ternaungi, cahaya sangat rendah.' }];