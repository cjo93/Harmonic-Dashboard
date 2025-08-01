import React from 'react';
import { UserBirthData, generatePersonalCosmos, PersonalCosmosData } from '../api/personalCosmos';

const UserDataForm: React.FC<{ onSubmit: (data: UserBirthData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<Partial<UserBirthData>>({
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthLocation: {
      city: '',
      country: '',
      latitude: 0,
      longitude: 0,
      timezone: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.birthDate && formData.birthTime && formData.birthLocation?.city) {
      onSubmit(formData as UserBirthData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-lg border border-gold max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif font-bold mb-6 text-gold text-center">
        Welcome to HarmonicGPT
      </h2>
      <p className="text-gray-300 mb-6 text-center font-sans">
        To begin your personalized reading, please provide your birth details. All information is encrypted and processed privately.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-gold font-serif mb-2" htmlFor="fullName">
            Full Legal Name at Birth *
          </label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full p-3 bg-gray-900 border border-gold rounded text-white focus:border-gold focus:outline-none"
            placeholder="Enter your complete birth name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gold font-serif mb-2" htmlFor="birthDate">
              Birth Date *
            </label>
            <input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
              className="w-full p-3 bg-gray-900 border border-gold rounded text-white focus:border-gold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gold font-serif mb-2" htmlFor="birthTime">
              Birth Time *
            </label>
            <input
              id="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData(prev => ({ ...prev, birthTime: e.target.value }))}
              className="w-full p-3 bg-gray-900 border border-gold rounded text-white focus:border-gold focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gold font-serif mb-2" htmlFor="city">
              Birth City *
            </label>
            <input
              id="city"
              type="text"
              value={formData.birthLocation?.city || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                birthLocation: { ...prev.birthLocation!, city: e.target.value }
              }))}
              className="w-full p-3 bg-gray-900 border border-gold rounded text-white focus:border-gold focus:outline-none"
              placeholder="e.g., New York"
              required
            />
          </div>

          <div>
            <label className="block text-gold font-serif mb-2" htmlFor="country">
              Birth Country *
            </label>
            <input
              id="country"
              type="text"
              value={formData.birthLocation?.country || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                birthLocation: { ...prev.birthLocation!, country: e.target.value }
              }))}
              className="w-full p-3 bg-gray-900 border border-gold rounded text-white focus:border-gold focus:outline-none"
              placeholder="e.g., USA"
              required
            />
          </div>
        </div>

        <div className="text-xs text-gray-400 bg-gray-900 p-4 rounded border border-gray-700">
          <p className="mb-2">
            <strong>Privacy Notice:</strong> Your data is processed locally and encrypted. Birth time can be found on your birth certificate or via astro.com.
          </p>
          <p>
            If any detail is unknown, please find it or we can provide approximate readings with available information.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gold text-black font-serif font-bold py-3 px-6 rounded hover:bg-yellow-500 transition-colors"
        >
          Generate Personal Cosmos Report
        </button>
      </div>
    </form>
  );
};

const PersonalCosmosReport: React.FC<{ data: PersonalCosmosData; userData: UserBirthData }> = ({ data, userData }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-gold mb-2">
          The Personal Cosmos
        </h1>
        <h2 className="text-2xl font-sans text-white mb-4">
          {userData.fullName}
        </h2>
        <p className="text-gray-300 italic">
          Born {userData.birthDate} at {userData.birthTime} in {userData.birthLocation.city}, {userData.birthLocation.country}
        </p>
      </div>

      {/* Core Synthesis */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gold">
        <h3 className="text-xl font-serif font-bold text-gold mb-4">Core Identity Synthesis</h3>
        <div className="space-y-3 text-gray-200">
          <p><strong>Life Purpose:</strong> {data.synthesis.lifePurpose}</p>
          <p><strong>Spiritual Path:</strong> {data.synthesis.spiritualPath}</p>
          <p><strong>Current Phase:</strong> {data.synthesis.currentPhase}</p>
        </div>
      </div>

      {/* Astrology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-900 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Western Astrology</h3>
          <div className="space-y-2 text-sm">
            <p>Sun: {data.astrology.western.sunSign}</p>
            <p>Moon: {data.astrology.western.moonSign}</p>
            <p>Ascendant: {data.astrology.western.ascendant}</p>
          </div>
        </div>

        <div className="bg-purple-900 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Vedic Astrology</h3>
          <div className="space-y-2 text-sm">
            <p>Sun (Sidereal): {data.astrology.vedic.sunSign}</p>
            <p>Moon Nakshatra: {data.astrology.vedic.nakshatras.moon}</p>
            <p>Current Dasha: {data.astrology.vedic.dashas.current}</p>
          </div>
        </div>

        <div className="bg-red-900 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Chinese BaZi</h3>
          <div className="space-y-2 text-sm">
            <p>Day Master: {data.astrology.chinese.dayMaster}</p>
            <p>Elements: Wood({data.astrology.chinese.elements.wood}) Fire({data.astrology.chinese.elements.fire}) Earth({data.astrology.chinese.elements.earth})</p>
          </div>
        </div>

        <div className="bg-green-900 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Mayan Astrology</h3>
          <div className="space-y-2 text-sm">
            <p>Galactic Signature: {data.astrology.mayan.galacticSignature}</p>
            <p>Solar Seal: {data.astrology.mayan.solarSeal}</p>
            <p>Galactic Tone: {data.astrology.mayan.galacticTone}</p>
          </div>
        </div>
      </div>

      {/* Human Design & Gene Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Human Design</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Type:</strong> {data.humanDesign.type}</p>
            <p><strong>Strategy:</strong> {data.humanDesign.strategy}</p>
            <p><strong>Authority:</strong> {data.humanDesign.authority}</p>
            <p><strong>Profile:</strong> {data.humanDesign.profile}</p>
          </div>
        </div>

        <div className="bg-blue-900 p-6 rounded-lg border border-gold">
          <h3 className="text-lg font-serif font-bold text-gold mb-3">Gene Keys</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Life's Work:</strong> Key {data.geneKeys.activationSequence.lifesWork.key} - {data.geneKeys.activationSequence.lifesWork.gift}</p>
            <p><strong>Evolution:</strong> Key {data.geneKeys.activationSequence.evolution.key} - {data.geneKeys.activationSequence.evolution.gift}</p>
          </div>
        </div>
      </div>

      {/* Numerology */}
      <div className="bg-yellow-900 p-6 rounded-lg border border-gold">
        <h3 className="text-lg font-serif font-bold text-gold mb-3">Numerology</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div><strong>Life Path:</strong> {data.numerology.lifePath}</div>
          <div><strong>Expression:</strong> {data.numerology.expression}</div>
          <div><strong>Soul Urge:</strong> {data.numerology.soulUrge}</div>
          <div><strong>Personality:</strong> {data.numerology.personality}</div>
          <div><strong>Birthday:</strong> {data.numerology.birthday}</div>
        </div>
      </div>

      {/* Growth & Integration */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gold">
        <h3 className="text-xl font-serif font-bold text-gold mb-4">Growth & Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-serif font-bold text-gold mb-2">Key Strengths</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
              {data.synthesis.keyStrengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-gold mb-2">Growth Areas</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
              {data.synthesis.growthAreas.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonalCosmosPage: React.FC = () => {
  const [userData, setUserData] = React.useState<UserBirthData | null>(null);
  const [cosmosData, setCosmosData] = React.useState<PersonalCosmosData | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleUserDataSubmit = async (data: UserBirthData) => {
    setLoading(true);
    setUserData(data);

    try {
      const cosmos = await generatePersonalCosmos(data);
      setCosmosData(cosmos);
    } catch (error) {
      console.error('Error generating cosmos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gold mb-4 animate-spin">⚌</div>
          <h2 className="text-2xl font-serif text-gold mb-2">Calculating Your Personal Cosmos</h2>
          <p className="text-gray-300">Processing your celestial blueprint...</p>
        </div>
      </div>
    );
  }

  if (cosmosData && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <PersonalCosmosReport data={cosmosData} userData={userData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black flex items-center justify-center p-6">
      <UserDataForm onSubmit={handleUserDataSubmit} />
    </div>
  );
};

export default PersonalCosmosPage;
