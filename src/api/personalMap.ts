// Personal Map API mock
export async function fetchPersonalMap() {
  // Replace with real API call
  return {
    milestones: [
      { label: 'Start', icon: 'circle' },
      { label: 'Milestone 1', icon: 'star' },
      { label: 'Milestone 2', icon: 'circle' },
      { label: 'Milestone 3', icon: 'star' },
      { label: 'Goal', icon: 'circle' },
    ],
    progress: 0.6,
  };
}
