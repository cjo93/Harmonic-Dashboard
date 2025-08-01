
import React from 'react';
import { fetchCompositeTiles } from '../api/compositeTiles';

const AdvancedMultiCompositeTiles: React.FC = () => {
  const [tiles, setTiles] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchCompositeTiles().then((d) => {
      setTiles(d);
      setLoading(false);
    });
  }, []);

  return (
    <section className="bg-black text-white rounded-lg shadow-lg p-6 mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold mb-4 tracking-wide border-b border-gold pb-2">Advanced Multi-Composite Tiles</h2>
      <div className="w-full flex flex-col gap-4">
        {loading ? (
          <div className="text-gold text-center py-8">Loading composite tiles...</div>
        ) : (
          tiles.map((tile, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gold">
              <h3 className="text-lg font-serif text-gold font-bold mb-2">{tile.title}</h3>
              <p className="text-gray-300">{tile.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default AdvancedMultiCompositeTiles;
