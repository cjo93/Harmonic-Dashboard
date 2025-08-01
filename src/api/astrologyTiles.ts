// Astrology Tiles API mock
export async function fetchAstrologyTiles() {
  // Replace with real API call
  return [
    { type: 'House', label: '1st House', description: 'Self, identity, appearance.' },
    { type: 'House', label: '2nd House', description: 'Values, possessions, self-worth.' },
    { type: 'House', label: '3rd House', description: 'Communication, siblings, learning.' },
    // ...all 12 houses
    { type: 'Angle', label: 'Ascendant (ASC)', description: 'Rising sign, persona.' },
    { type: 'Angle', label: 'Descendant (DSC)', description: 'Partnerships, others.' },
    { type: 'Angle', label: 'Midheaven (MC)', description: 'Career, public image.' },
    { type: 'Angle', label: 'Imum Coeli (IC)', description: 'Roots, home, foundation.' },
    { type: 'Cusp', label: 'Cusp 1', description: 'Transition between houses.' },
    // ...all 12 cusps
    { type: 'Gate', label: 'Gate 1', description: 'Creativity, self-expression.' },
    { type: 'Gate', label: 'Gate 2', description: 'Direction, receptivity.' },
    // ...all 64 gates
    { type: 'Channel', label: 'Channel 1-8', description: 'Inspiration, creative role model.' },
    { type: 'Channel', label: 'Channel 2-14', description: 'Direction of self.' },
    // ...all 36 channels
  ];
}
