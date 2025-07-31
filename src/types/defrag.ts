// Defrag/HiGPT specific type definitions

export interface GearAlignment {
  id: string;
  name: string;
  value: number; // 0-100 percentage
  status: 'optimal' | 'warning' | 'critical';
  description: string;
}

export interface MirrorState {
  clarity: number; // 0-100
  resonance: number; // 0-100
  depth: number; // 0-100
  reflection: string;
}

export interface SymbolicBand {
  frequency: number;
  amplitude: number;
  phase: number;
  color: string;
  meaning: string;
}

export interface DefragProfile {
  msi: number;
  mirrorState: MirrorState;
  gearAlignments: GearAlignment[];
  symbolicBands: SymbolicBand[];
  archetypes: string[];
  prompts: string[];
}

export interface SacredGeometry {
  type: 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'octagon' | 'fibonacci' | 'golden_ratio';
  rotation: number;
  scale: number;
  opacity: number;
  color: string;
}

export interface HarmonicResonance {
  frequency: number;
  amplitude: number;
  phase: number;
  harmonics: number[];
}

export interface BiometricData {
  heartRate: number;
  brainwaves: {
    alpha: number;
    beta: number;
    gamma: number;
    delta: number;
    theta: number;
  };
  stress: number;
  focus: number;
}

export interface AstrologicalData {
  sunSign: string;
  moonSign: string;
  rising: string;
  planets: Record<string, { sign: string; house: number; degree: number }>;
  aspects: Array<{ planet1: string; planet2: string; aspect: string; degree: number }>;
}

export interface MeditationSession {
  duration: number; // minutes
  type: 'breathing' | 'visualization' | 'mantra' | 'mindfulness';
  guidance: string[];
  background: 'nature' | 'binaural' | 'silence' | 'sacred';
  intensity: 'gentle' | 'moderate' | 'deep';
}

export interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage change
  color: string;
}
