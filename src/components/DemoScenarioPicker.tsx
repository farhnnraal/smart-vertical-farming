import React from 'react';
import { FlaskConicalIcon } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { useFarm } from '../contexts/FarmContext';

/**
 * Pemilih skenario Mode Demo. Mengubah skenario akan mengubah nilai sensor,
 * skor kondisi, prioritas, dan rekomendasi sehingga alur sistem pendukung
 * keputusan dapat diperagakan.
 */
export function DemoScenarioPicker() {
  const { scenarioId, setScenario } = useFarm();

  return (
    <section
      aria-labelledby="skenario-demo"
      className="rounded-2xl border border-leaf-100 bg-white p-5 shadow-card">
      
      <h2 id="skenario-demo" className="flex items-center gap-2 text-base font-extrabold text-ink-900">
        <FlaskConicalIcon className="h-4.5 w-4.5 text-[#9a5f05]" aria-hidden="true" />
        Skenario Mode Demo
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-500">
        Pilih skenario untuk melihat bagaimana sistem menilai kondisi dan menyusun prioritas
        tindakan. Seluruh nilai pada skenario ini adalah data simulasi.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {DEMO_SCENARIOS.map((scenario) => {
          const active = scenario.id === scenarioId;
          return (
            <li key={scenario.id}>
              <button
                type="button"
                onClick={() => setScenario(scenario.id)}
                aria-pressed={active}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors duration-150 ${
                active ?
                'border-leaf-500 bg-leaf-50' :
                'border-leaf-100 bg-white hover:bg-canvas-sunken'}`
                }>
                
                <p
                  className={`text-sm font-bold ${active ? 'text-leaf-700' : 'text-ink-900'}`}>
                  
                  {scenario.name}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{scenario.note}</p>
              </button>
            </li>);

        })}
      </ul>
    </section>);

}