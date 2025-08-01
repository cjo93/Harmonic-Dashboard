
import React from 'react';
import { fetchDiagnostics } from '../api/diagnostics';

const DiagnosticsTable: React.FC = () => {
  const [data, setData] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchDiagnostics().then((rows) => {
      setData(rows);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-serif font-bold mb-4 tracking-wide border-b border-gold pb-2">Energetic Diagnostics</h2>
      {loading ? (
        <div className="text-gold text-center py-8">Loading diagnostics...</div>
      ) : (
        <table className="w-full table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gold uppercase text-sm">
              <th className="text-left">Category</th>
              <th className="text-left">Status</th>
              <th className="text-left">Score</th>
              <th className="text-left">Aspect</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={row.category} className="bg-gray-900/60 hover:bg-gold/10 transition">
                <td className="py-2 font-semibold font-serif">{row.category}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold border ${row.status === 'FLOW' ? 'bg-gold text-black' : 'border-gold text-gold'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-2 font-mono text-lg">{row.score}</td>
                <td className="py-2 font-sans italic">{row.aspect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DiagnosticsTable;
