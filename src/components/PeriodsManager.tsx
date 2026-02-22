import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import type { Period } from '../types';

interface PeriodsManagerProps {
  periods: Period[];
  periodTypes: string[];
  onAddPeriod: (period: Omit<Period, 'id'>) => void;
  onUpdatePeriod: (id: string, updates: Partial<Period>) => void;
  onRemovePeriod: (id: string) => void;
  displayMonth?: Date;
}

const COLORS = [
  { name: 'Acid Green', value: 'bg-acid-green-dim border-acid-green' },
  { name: 'Crimson', value: 'bg-crimson-dim border-crimson' },
  { name: 'Amber', value: 'bg-amber-100 border-amber' },
  { name: 'Blue', value: 'bg-blue-500 border-blue-600' },
  { name: 'Cyan', value: 'bg-cyan-500 border-cyan-600' },
];

// Auto-assign colors based on period type
const getColorForType = (type: string, periods: Period[]): string => {
  // Check if this type already exists
  const existingPeriod = periods.find(p => p.type === type);
  if (existingPeriod) {
    return existingPeriod.color;
  }
  // Assign a new color based on how many unique types exist
  const uniqueTypes = new Set(periods.map(p => p.type));
  const colorIndex = uniqueTypes.size % COLORS.length;
  return COLORS[colorIndex].value;
};

export const PeriodsManager: React.FC<PeriodsManagerProps> = ({
  periods,
  periodTypes,
  onAddPeriod,
  onUpdatePeriod,
  onRemovePeriod,
  displayMonth = new Date()
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Kids with me',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    color: 'bg-blue-100 border-blue-300',
    description: ''
  });

  // Filter periods to only show those that overlap with the displayed month
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);
  const visiblePeriods = periods.filter(p => 
    // Period starts before month ends AND period ends after month starts
    p.startDate <= monthEnd && p.endDate >= monthStart
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.startDate || !formData.endDate) return;

    const color = getColorForType(formData.type, periods);
    const newPeriod = {
      name: formData.name,
      type: formData.type,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      color: color,
      description: formData.description
    };

    onAddPeriod(newPeriod);
    resetForm();
  };

  const handleEdit = (period: Period) => {
    setEditingId(period.id);
    setFormData({
      name: period.name,
      type: period.type,
      startDate: format(period.startDate, 'yyyy-MM-dd'),
      endDate: format(period.endDate, 'yyyy-MM-dd'),
      color: period.color,
      description: period.description || ''
    });
  };

  const handleSaveEdit = (id: string) => {
    if (!formData.name.trim() || !formData.startDate || !formData.endDate) return;

    const color = getColorForType(formData.type, periods);
    onUpdatePeriod(id, {
      name: formData.name,
      type: formData.type,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      color: color,
      description: formData.description
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'Kids with me',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      color: 'bg-blue-100 border-blue-300',
      description: ''
    });
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="bg-bg-card rounded-lg shadow-sm border border-border-subtle p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary font-display">Periods & Schedules</h3>
        {!isFormOpen && !editingId && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-3 py-1 rounded-md text-sm font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Period
          </button>
        )}
      </div>

      {/* Form */}
      {(isFormOpen || editingId) && (
        <form onSubmit={e => { e.preventDefault(); editingId ? handleSaveEdit(editingId) : handleSubmit(e); }} className="bg-bg-elevated p-4 rounded-lg mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Week 1, Spring vacation"
              className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary placeholder-text-muted"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Type (periods with same type share color)</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {periodTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    formData.type === type
                      ? 'bg-acid-green text-bg-void'
                      : 'bg-bg-card text-text-secondary hover:bg-bg-surface'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              placeholder="Or enter custom type..."
              className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary placeholder-text-muted"
            />
            <p className="text-xs text-text-muted mt-1">Manage period types in Settings</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description (optional)</label>
            <input
              type="text"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add notes..."
              className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary placeholder-text-muted"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors text-sm"
            >
              <Check className="w-4 h-4" />
              {editingId ? 'Update' : 'Add'} Period
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 flex items-center justify-center gap-2 bg-bg-card hover:bg-bg-elevated text-text-primary px-4 py-2 rounded-md font-medium transition-colors text-sm border border-border-subtle"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Periods List */}
      {visiblePeriods.length === 0 ? (
        <p className="text-sm text-text-muted text-center py-4">No periods added yet</p>
      ) : (
        <div className="space-y-2">
          {visiblePeriods.map(period => (
            <div
              key={period.id}
              className={`p-3 rounded-lg border ${period.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{period.name}</h4>
                  <p className="text-xs text-text-secondary mt-0.5 font-medium">{period.type}</p>
                  <p className="text-sm text-text-secondary mt-1">
                    {format(period.startDate, 'MMM d, yyyy')} - {format(period.endDate, 'MMM d, yyyy')}
                  </p>
                  {period.description && (
                    <p className="text-sm text-text-secondary mt-1">{period.description}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(period)}
                    className="text-text-muted hover:text-acid-green transition-colors p-1"
                    title="Edit period"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemovePeriod(period.id)}
                    className="text-text-muted hover:text-crimson transition-colors p-1"
                    title="Delete period"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
