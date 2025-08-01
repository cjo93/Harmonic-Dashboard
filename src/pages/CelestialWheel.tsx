
import React from 'react';
import { fetchCelestialData } from '../api/celestial';

const CelestialWheel: React.FC = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchCelestialData().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-gradient-to-br from-black via-indigo-900 to-gold-100 rounded-lg shadow-lg p-6 mt-8 text-white flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold mb-4 tracking-wide border-b border-gold pb-2">Celestial Wheel</h2>
      <div className="w-64 h-64 flex items-center justify-center bg-black rounded-full border-4 border-gold relative">
        {/* Sacred geometry overlay, torus, and star motifs would be rendered here */}
        <span className="absolute text-gold text-6xl font-serif select-none" style={{ top: '40%', left: '40%' }}>&#9733;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '10%', left: '70%' }}>&#11044;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '70%', left: '20%' }}>&#11044;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '80%', left: '80%' }}>&#11044;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '20%', left: '20%' }}>&#11044;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '50%', left: '10%' }}>&#11044;</span>
        <span className="absolute text-gold text-2xl font-serif select-none" style={{ top: '50%', left: '80%' }}>&#11044;</span>
        {/* Astrological chart from API */}
        {loading ? (
          <span className="text-gold text-lg font-sans">Loading chart...</span>
        ) : (
          <span className="text-white text-lg font-sans">{data?.chart}</span>
        )}
      </div>
      <p className="mt-4 text-gold text-center font-sans">
        Live astrological chart with sacred geometry overlays. Interactive features coming soon.<br />
        {loading ? null : <span className="text-xs text-gray-300">Last updated: {new Date(data.timestamp).toLocaleTimeString()}</span>}
      </p>
    </section>
  );
};

export default CelestialWheel;
