import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface SettingsViewProps {
  periodTypes: string[];
  onAddPeriodType: (type: string) => void;
  onRemovePeriodType: (type: string) => void;
  agendaTypes: string[];
  onAddAgendaType: (type: string) => void;
  onRemoveAgendaType: (type: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  periodTypes,
  onAddPeriodType,
  onRemovePeriodType,
  agendaTypes,
  onAddAgendaType,
  onRemoveAgendaType
}) => {
  const [newType, setNewType] = useState('');
  const [newAgendaType, setNewAgendaType] = useState('');

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault();
    if (newType.trim()) {
      onAddPeriodType(newType);
      setNewType('');
    }
  };

  const handleAddAgendaType = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAgendaType.trim()) {
      onAddAgendaType(newAgendaType);
      setNewAgendaType('');
    }
  };

  return (
    <div className="md:ml-20">
      {/* Header */}
      <div className="bg-bg-card border-b border-border-subtle p-4 md:p-6">
        <h1 className="text-2xl font-bold text-text-primary font-display">Settings</h1>
      </div>

      {/* Content Area */}
      <main className="p-4 md:p-6 pb-20 md:pb-8 max-w-2xl">
        {/* Period Types Section */}
        <div className="bg-bg-card rounded-lg shadow-sm border border-border-subtle p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 font-display">Period Types</h2>
          <p className="text-sm text-text-secondary mb-4">
            Manage the types of periods you want to track (e.g., custody schedules, vacations, work projects).
          </p>

          {/* Add New Type Form */}
          <form onSubmit={handleAddType} className="mb-6 p-4 bg-bg-elevated rounded-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={newType}
                onChange={e => setNewType(e.target.value)}
                placeholder="Enter new period type..."
                className="flex-1 px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary placeholder-text-muted"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Type
              </button>
            </div>
          </form>

          {/* Period Types List */}
          <div className="space-y-2">
            {periodTypes.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-4">No period types yet</p>
            ) : (
              periodTypes.map(type => (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 bg-bg-elevated rounded-md border border-border-subtle hover:border-border-mid transition-colors"
                >
                  <span className="font-medium text-text-primary">{type}</span>
                  <button
                    onClick={() => onRemovePeriodType(type)}
                    className="text-text-muted hover:text-crimson transition-colors p-1"
                    title="Delete period type"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-acid-green-dim border border-acid-green rounded-lg">
            <p className="text-sm text-acid-green font-medium">
              <strong>Tip:</strong> Period types are automatically assigned colors and periods with the same type will share the same color on the calendar.
            </p>
          </div>
        </div>

        {/* Agenda Item Types Section */}
        <div className="mt-6 bg-bg-card rounded-lg shadow-sm border border-border-subtle p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 font-display">Agenda Item Types</h2>
          <p className="text-sm text-text-secondary mb-4">
            Manage the types of agenda items you want to track (e.g., tasks, meetings, calls, appointments).
          </p>

          {/* Add New Agenda Type Form */}
          <form onSubmit={handleAddAgendaType} className="mb-6 p-4 bg-bg-elevated rounded-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAgendaType}
                onChange={e => setNewAgendaType(e.target.value)}
                placeholder="Enter new agenda type..."
                className="flex-1 px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary placeholder-text-muted"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Type
              </button>
            </div>
          </form>

          {/* Agenda Types List */}
          <div className="space-y-2">
            {agendaTypes.length === 0 ? (
              <p className="text-sm text-text-muted text-center py-4">No agenda types yet</p>
            ) : (
              agendaTypes.map(type => (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 bg-bg-elevated rounded-md border border-border-subtle hover:border-border-mid transition-colors"
                >
                  <span className="font-medium text-text-primary">{type}</span>
                  <button
                    onClick={() => onRemoveAgendaType(type)}
                    className="text-text-muted hover:text-crimson transition-colors p-1"
                    title="Delete agenda type"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-acid-green-dim border border-acid-green rounded-lg">
            <p className="text-sm text-acid-green font-medium">
              <strong>Tip:</strong> You can quickly select predefined types when adding agenda items, or type a custom one on the fly.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 bg-bg-card rounded-lg shadow-sm border border-border-subtle p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4 font-display">About</h2>
          <p className="text-sm text-text-secondary">
            Life Sync App v1.0 - A personal agenda, shopping list, and schedule tracker with period management.
          </p>
          <p className="text-sm text-text-secondary mt-2">
            All data is stored locally in your browser. No data is sent to any server.
          </p>
        </div>
      </main>
    </div>
  );
};
