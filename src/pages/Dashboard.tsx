import React from 'react';
import DiagnosticsTable from '../components/DiagnosticsTable';
import CelestialWheel from './CelestialWheel';
import MirrorStateOverview from './MirrorStateOverview';
import PersonalMap from './PersonalMap';
import AdvancedMultiCompositeTiles from './AdvancedMultiCompositeTiles';
import DashboardTile from '../components/DashboardTile';
import MSITile from '../components/MSITile';
import DefragTile from '../components/DefragTile';
import ConvergenceTile from '../components/ConvergenceTile';
import AstrologyTiles from './AstrologyTiles';

const Dashboard: React.FC = () => (
  <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
    <section className="max-w-7xl mx-auto py-12 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2 text-gold drop-shadow-lg">
          Decode the Design. Break the Loop. Return to Signal.
        </h1>
        <p className="text-lg font-sans text-gray-300 max-w-2xl">
          The Sacred Rebellion &mdash; Built for the Coded Ones
        </p>
      </header>

      {/* Priority Status Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <MSITile />
        <DefragTile />
        <ConvergenceTile />
      </div>

      {/* Main Dashboard Tiles */}
      <div className="space-y-6">
        <DashboardTile title="Astrology Gates, Channels, Houses, Angles, Cusps">
          <AstrologyTiles />
        </DashboardTile>

        <DashboardTile title="Celestial Wheel">
          <CelestialWheel />
        </DashboardTile>

        <DashboardTile title="Mirror State Overview">
          <MirrorStateOverview />
        </DashboardTile>

        <DashboardTile title="Personal Map">
          <PersonalMap />
        </DashboardTile>

        <DashboardTile title="Energetic Diagnostics">
          <DiagnosticsTable />
        </DashboardTile>

        <DashboardTile title="Advanced Multi-Composite Tiles">
          <AdvancedMultiCompositeTiles />
        </DashboardTile>
      </div>
    </section>
  </main>
);

export default Dashboard;
