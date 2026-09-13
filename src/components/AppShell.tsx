import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ClipboardCheckIcon,
  HistoryIcon,
  HomeIcon,
  LeafIcon,
  ListChecksIcon,
  SettingsIcon,
  SproutIcon,
  ActivityIcon } from
'lucide-react';

import { useFarm } from '../contexts/FarmContext';

import verticalPakchoy_logo from '../assets/vertical-pakchoy-logo.svg';

const PRIMARY_NAV = [
{ to: '/', label: 'Beranda', icon: HomeIcon },
{ to: '/monitoring', label: 'Monitoring', icon: ActivityIcon },
{ to: '/rekomendasi', label: 'Rekomendasi', icon: ListChecksIcon },
{ to: '/tanaman', label: 'Tanaman', icon: SproutIcon },
{ to: '/pengaturan', label: 'Pengaturan', icon: SettingsIcon }];

const SECONDARY_NAV = [
{ to: '/evaluasi', label: 'Evaluasi Budidaya', icon: ClipboardCheckIcon },
{ to: '/riwayat', label: 'Riwayat', icon: HistoryIcon }];


function Brand({ compact = false }: {compact?: boolean;}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-white">
        <img src={verticalPakchoy_logo} alt="Description" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink-900">
          Smart Vertical Farming
        </p>
        {!compact &&
        <p className="truncate text-[11px] text-ink-500">
            Sistem Pendukung Keputusan Budidaya Vertical Hidroponik
          </p>
        }
      </div>
    </div>);

}

export function AppShell({ children }: {children: React.ReactNode;}) {
  const { demoMode, scenarioName } = useFarm();
  const location = useLocation();

  const isActive = (to: string) =>
  to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <div className="min-h-full w-full bg-canvas">
      {/* Navigasi samping — tablet besar & desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-leaf-100 bg-white px-4 py-5 lg:flex">
        <Brand />
        <nav aria-label="Navigasi utama" className="mt-7 flex-1">
          <ul className="space-y-1">
            {PRIMARY_NAV.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-bold transition-colors duration-150 ${
                isActive(item.to) ?
                'bg-leaf-50 text-leaf-700' :
                'text-ink-500 hover:bg-canvas-sunken hover:text-ink-900'}`
                }
                aria-current={isActive(item.to) ? 'page' : undefined}>
                
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
          <p className="mt-6 px-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-400">
            Lainnya
          </p>
          <ul className="mt-2 space-y-1">
            {SECONDARY_NAV.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors duration-150 ${
                isActive(item.to) ?
                'bg-leaf-50 text-leaf-700' :
                'text-ink-500 hover:bg-canvas-sunken hover:text-ink-900'}`
                }
                aria-current={isActive(item.to) ? 'page' : undefined}>
                
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="rounded-xl bg-canvas-sunken p-3">
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-ink-500">
            {demoMode ? 'Mode Demo aktif' : 'Data sensor aktif'}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            {demoMode ? `Skenario: ${scenarioName}` : 'Terhubung ke Firebase'}
          </p>
        </div>
      </aside>

      {/* Header — ponsel & tablet */}
      <header className="sticky top-0 z-20 border-b border-leaf-100 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Brand compact />
          {demoMode &&
          <span className="flex-none rounded-full bg-[#fdf3e3] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#9a5f05]">
              Mode Demo
            </span>
          }
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4 lg:max-w-5xl lg:pb-10 lg:pl-72 lg:pr-6 lg:pt-8 xl:max-w-6xl">
        {children}
      </main>

      {/* Navigasi bawah — ponsel & tablet */}
      <nav
        aria-label="Navigasi utama"
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-leaf-100 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
        
        <ul className="mx-auto flex max-w-3xl">
          {PRIMARY_NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.to} className="flex-1">
                <NavLink
                  to={item.to}
                  className="flex min-h-[60px] flex-col items-center justify-center gap-1 px-1 py-2"
                  aria-current={active ? 'page' : undefined}>
                  
                  <item.icon
                    className={`h-[22px] w-[22px] ${active ? 'text-leaf-600' : 'text-ink-400'}`}
                    aria-hidden="true" />
                  
                  <span
                    className={`text-[10.5px] font-bold leading-none ${
                    active ? 'text-leaf-700' : 'text-ink-500'}`
                    }>
                    
                    {item.label}
                  </span>
                </NavLink>
              </li>);

          })}
        </ul>
      </nav>
    </div>);

}