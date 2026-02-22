import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { AgendaView } from './components/AgendaView';
import { ShoppingView } from './components/ShoppingView';
import { SettingsView } from './components/SettingsView';
import { useStore } from './hooks/useStore';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'AGENDA' | 'SHOPPING' | 'SETTINGS'>('AGENDA');
  const { periodTypes, addPeriodType, removePeriodType, agendaTypes, addAgendaType, removeAgendaType, currentUser, isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-void text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-acid-green mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-void text-text-primary">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {activeTab === 'AGENDA' && <AgendaView />}
      {activeTab === 'SHOPPING' && <ShoppingView />}
      {activeTab === 'SETTINGS' && (
        <SettingsView
          currentUser={currentUser}
          periodTypes={periodTypes}
          onAddPeriodType={addPeriodType}
          onRemovePeriodType={removePeriodType}
          agendaTypes={agendaTypes}
          onAddAgendaType={addAgendaType}
          onRemoveAgendaType={removeAgendaType}
        />
      )}
    </div>
  );
}

export default App;