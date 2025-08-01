// MSI (Macro-Synchronicity Index) API mock
export interface MSIData {
  index: number; // 0-100 score
  phase: 'Dormant' | 'Growth' | 'Initiation' | 'Collapse' | 'Mythic';
  harmonicDensity: number;
  orbitalCoherence: number;
  temporalCluster: number;
  symbolicRecurrence: number;
  activeTriggers: string[];
  nextSignificantDate: string;
}

export async function fetchMSI(): Promise<MSIData> {
  // Replace with real MSI calculation
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    index: 78.5,
    phase: 'Initiation',
    harmonicDensity: 0.82,
    orbitalCoherence: 0.91,
    temporalCluster: 0.73,
    symbolicRecurrence: 0.67,
    activeTriggers: [
      'Pluto trine natal Moon (±1.2°)',
      'Jupiter conjunct progressed Sun (±0.8°)',
      'Lunar Node activation (22.5° harmonic)'
    ],
    nextSignificantDate: '2025-08-15'
  };
}
