import React, { useState } from 'react';

interface SettingsData {
  personalInfo: {
    name: string;
    email: string;
    timezone: string;
  };
  preferences: {
    defaultAstrologicalSystem: string;
    showAdvancedAnalysis: boolean;
    enableNotifications: boolean;
    dataPrivacy: string;
  };
  integration: {
    autoSyncCalendar: boolean;
    reminderFrequency: string;
    deepDiveInterval: string;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    personalInfo: {
      name: '',
      email: '',
      timezone: 'UTC'
    },
    preferences: {
      defaultAstrologicalSystem: 'Western',
      showAdvancedAnalysis: true,
      enableNotifications: true,
      dataPrivacy: 'Private'
    },
    integration: {
      autoSyncCalendar: false,
      reminderFrequency: 'Weekly',
      deepDiveInterval: 'Monthly'
    }
  });

  const [activeTab, setActiveTab] = useState<'personal' | 'preferences' | 'integration'>('personal');

  const handleInputChange = (section: keyof SettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would save to your backend/localStorage
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">Settings</h1>
          <p className="text-gray-300">
            Configure your Harmonic Intelligence experience
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-1">
          {[
            { key: 'personal', label: 'Personal Info' },
            { key: 'preferences', label: 'Preferences' },
            { key: 'integration', label: 'Integration' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all ${activeTab === tab.key
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-8">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gold mb-4">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={settings.personalInfo.name}
                    onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                  <select
                    value={settings.personalInfo.timezone}
                    onChange={(e) => handleInputChange('personalInfo', 'timezone', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gold mb-4">Preferences</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Default Astrological System</label>
                  <select
                    value={settings.preferences.defaultAstrologicalSystem}
                    onChange={(e) => handleInputChange('preferences', 'defaultAstrologicalSystem', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="Western">Western</option>
                    <option value="Vedic">Vedic</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mayan">Mayan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data Privacy</label>
                  <select
                    value={settings.preferences.dataPrivacy}
                    onChange={(e) => handleInputChange('preferences', 'dataPrivacy', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="Private">Private (Local Only)</option>
                    <option value="Encrypted">Encrypted Cloud</option>
                    <option value="Anonymous">Anonymous Analytics</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-300">Show Advanced Analysis</div>
                      <div className="text-xs text-gray-500">Display complex astrological calculations</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences.showAdvancedAnalysis}
                        onChange={(e) => handleInputChange('preferences', 'showAdvancedAnalysis', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-300">Enable Notifications</div>
                      <div className="text-xs text-gray-500">Receive alerts for significant transits</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences.enableNotifications}
                        onChange={(e) => handleInputChange('preferences', 'enableNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gold mb-4">Integration Settings</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-300">Auto-Sync Calendar</div>
                    <div className="text-xs text-gray-500">Automatically add astrological events to your calendar</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.integration.autoSyncCalendar}
                      onChange={(e) => handleInputChange('integration', 'autoSyncCalendar', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Reminder Frequency</label>
                  <select
                    value={settings.integration.reminderFrequency}
                    onChange={(e) => handleInputChange('integration', 'reminderFrequency', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Never">Never</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deep Dive Interval</label>
                  <select
                    value={settings.integration.deepDiveInterval}
                    onChange={(e) => handleInputChange('integration', 'deepDiveInterval', e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-gold/20 rounded-md text-white focus:outline-none focus:border-gold/50"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gold/20">
            <button
              onClick={handleSave}
              className="w-full bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold font-semibold py-3 px-6 rounded-md transition-all duration-200"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
