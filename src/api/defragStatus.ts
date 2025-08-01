// Defrag Status API mock - tracks internal coherence and fragmentation
export interface DefragStatus {
  overallCoherence: number; // 0-100
  fragmentationLevel: number; // 0-100
  integrationProgress: number; // 0-100
  activeDefenses: string[];
  shadows: ShadowData[];
  integrationTasks: IntegrationTask[];
  nextRecommendation: string;
}

export interface ShadowData {
  id: string;
  aspect: string;
  intensity: number;
  lastActivated: string;
  integrationLevel: number;
}

export interface IntegrationTask {
  id: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Shadow Work' | 'Trauma Integration' | 'Skill Building' | 'Relationship';
  estimatedDays: number;
}

export async function fetchDefragStatus(): Promise<DefragStatus> {
  // Replace with real psychological assessment integration
  await new Promise(resolve => setTimeout(resolve, 900));

  return {
    overallCoherence: 67.3,
    fragmentationLevel: 32.7,
    integrationProgress: 78.9,
    activeDefenses: [
      'Intellectual Bypass',
      'Perfectionism',
      'People Pleasing'
    ],
    shadows: [
      {
        id: 'shadow_1',
        aspect: 'Suppressed Anger',
        intensity: 73,
        lastActivated: '2025-02-01',
        integrationLevel: 45
      },
      {
        id: 'shadow_2',
        aspect: 'Authority Complex',
        intensity: 61,
        lastActivated: '2025-01-28',
        integrationLevel: 62
      },
      {
        id: 'shadow_3',
        aspect: 'Abandonment Fear',
        intensity: 82,
        lastActivated: '2025-02-02',
        integrationLevel: 34
      }
    ],
    integrationTasks: [
      {
        id: 'task_1',
        task: 'Active Imagination with Authority Figure',
        priority: 'High',
        category: 'Shadow Work',
        estimatedDays: 14
      },
      {
        id: 'task_2',
        task: 'Somatic Anger Release Practice',
        priority: 'High',
        category: 'Trauma Integration',
        estimatedDays: 21
      },
      {
        id: 'task_3',
        task: 'Boundary Setting with Close Relationships',
        priority: 'Medium',
        category: 'Relationship',
        estimatedDays: 7
      }
    ],
    nextRecommendation: 'Focus on somatic integration of suppressed emotions through breathwork and movement'
  };
}
