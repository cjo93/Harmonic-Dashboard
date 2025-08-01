
import React from 'react';
import { fetchPersonalMap } from '../api/personalMap';

const iconMap: Record<string, string> = {
  circle: '●',
  star: '★',
};

const PersonalMap: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchPersonalMap().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gold-100 rounded-lg shadow-lg p-6 mt-8 text-white flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold mb-4 tracking-wide border-b border-gold pb-2">Personal Map</h2>
      <div className="w-full flex flex-col items-center">
        <div className="w-80 h-24 bg-gray-800 rounded-full border-2 border-gold flex items-center justify-between px-6 relative">
          {loading
            ? Array(5).fill(null).map((_, i) => (
              <span key={i} className="text-gold text-2xl font-serif animate-pulse">●</span>
            ))
            : data.milestones.map((m: any, i: number) => (
              <span key={i} className="text-gold text-2xl font-serif">{iconMap[m.icon] || '●'}</span>
            ))}
        </div>
        <p className="mt-4 text-gold text-center font-sans">
          Gamified journey tracker with milestone visualization.<br />
          {loading ? 'Loading milestones...' : `Progress: ${(data.progress * 100).toFixed(0)}%`}
        </p>
      </div>
    </section>
  );
};

export default PersonalMap;
