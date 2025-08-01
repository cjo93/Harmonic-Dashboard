
import React from 'react';
import { fetchMirrorState } from '../api/mirrorState';

const MirrorStateOverview: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchMirrorState().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-black text-white rounded-lg shadow-lg p-6 mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold mb-4 tracking-wide border-b border-gold pb-2">Mirror State Overview</h2>
      <div className="flex flex-col items-center">
        <span className="text-5xl font-serif text-gold mb-2">&#9854;</span>
        {loading ? (
          <span className="text-gold text-lg font-sans">Loading state...</span>
        ) : (
          <span className="text-lg font-sans">Current State: <span className="font-bold text-gold">{data.state}</span></span>
        )}
        <p className="mt-2 text-gray-300 text-center max-w-md">
          {loading ? 'Fetching insight...' : data.description}
        </p>
      </div>
    </section>
  );
};

export default MirrorStateOverview;
