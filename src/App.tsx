import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FarmProvider } from './contexts/FarmContext';
import { AppShell } from './components/AppShell';
import { Beranda } from './pages/Beranda';
import { Monitoring } from './pages/Monitoring';
import { SensorDetail } from './pages/SensorDetail';
import { Rekomendasi } from './pages/Rekomendasi';
import { Tanaman } from './pages/Tanaman';
import { Evaluasi } from './pages/Evaluasi';
import { Riwayat } from './pages/Riwayat';
import { Pengaturan } from './pages/Pengaturan';

export function App() {
  return (
    <FarmProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/monitoring/:parameter" element={<SensorDetail />} />
            <Route path="/rekomendasi" element={<Rekomendasi />} />
            <Route path="/tanaman" element={<Tanaman />} />
            <Route path="/evaluasi" element={<Evaluasi />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </FarmProvider>);

}