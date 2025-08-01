import React from 'react';
import { fetchAstrologyTiles } from '../api/astrologyTiles';

const typeColors: Record<string, string> = {
  House: 'bg-indigo-900',
  Angle: 'bg-gold text-black',
  Cusp: 'bg-gray-700',
  Gate: 'bg-black border-gold',
  Channel: 'bg-gray-900',
};

const AstrologyTiles: React.FC = () => {
  const [tiles, setTiles] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchAstrologyTiles().then((d) => {
      setTiles(d);
      setLoading(false);
    });
  }, []);

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {loading ? (
        <div className="col-span-full text-gold text-center py-8">Loading astrology tiles...</div>
      ) : (
        tiles.map((tile, i) => (
          <div
            key={i}
            className={`rounded-lg shadow-lg p-4 border border-gold flex flex-col items-start ${typeColors[tile.type] || 'bg-black'}`}
          >
            <div className="font-serif text-lg font-bold mb-1">{tile.label}</div>
            <div className="text-xs uppercase tracking-widest text-gold mb-2">{tile.type}</div>
            <div className="font-sans text-sm text-white/90">{tile.description}</div>
          </div>
        ))
      )}
    </section>
  );
};

export default AstrologyTiles;
