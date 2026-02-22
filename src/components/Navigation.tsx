import React from 'react';
import { Calendar, ShoppingCart, Settings } from 'lucide-react';
import clsx from 'clsx';

interface NavigationProps {
  activeTab: 'AGENDA' | 'SHOPPING' | 'SETTINGS';
  setActiveTab: (tab: 'AGENDA' | 'SHOPPING' | 'SETTINGS') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-bg-elevated border-b border-border-subtle text-text-primary p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-display">Life Sync</h1>
          <p className="text-text-secondary">Manage your work & personal life</p>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border-subtle flex justify-around shadow-lg z-20">
        <button
          onClick={() => setActiveTab('AGENDA')}
          className={clsx(
            'flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors',
            activeTab === 'AGENDA'
              ? 'text-acid-green border-t-2 border-acid-green'
              : 'text-text-muted'
          )}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-medium">Agenda</span>
        </button>
        <button
          onClick={() => setActiveTab('SHOPPING')}
          className={clsx(
            'flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors',
            activeTab === 'SHOPPING'
              ? 'text-acid-green border-t-2 border-acid-green'
              : 'text-text-muted'
          )}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-medium">Shopping</span>
        </button>
        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={clsx(
            'flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors',
            activeTab === 'SETTINGS'
              ? 'text-acid-green border-t-2 border-acid-green'
              : 'text-text-muted'
          )}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex fixed left-0 top-24 h-screen w-20 flex-col bg-bg-card text-text-primary p-2 gap-2 border-r border-border-subtle items-center z-30">
        <button
          onClick={() => setActiveTab('AGENDA')}
          className={clsx(
            'p-3 rounded-md transition-colors',
            activeTab === 'AGENDA'
              ? 'bg-acid-green text-bg-void'
              : 'hover:bg-bg-elevated text-text-primary'
          )}
          title="My Agenda"
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('SHOPPING')}
          className={clsx(
            'p-3 rounded-md transition-colors',
            activeTab === 'SHOPPING'
              ? 'bg-acid-green text-bg-void'
              : 'hover:bg-bg-elevated text-text-primary'
          )}
          title="Shopping List"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={clsx(
            'p-3 rounded-md transition-colors mt-auto',
            activeTab === 'SETTINGS'
              ? 'bg-acid-green text-bg-void'
              : 'hover:bg-bg-elevated text-text-primary'
          )}
          title="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
};
