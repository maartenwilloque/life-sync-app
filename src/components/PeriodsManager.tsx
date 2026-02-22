import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, addWeeks, addMonths, differenceInDays } from 'date-fns';
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
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [repeatUntil, setRepeatUntil] = useState(format(addMonths(new Date(), 6), 'yyyy-MM-dd'));

  // Filter periods to only show those that overlap with the displayed month
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);
  const visiblePeriods = periods.filter(p => 
    // Period starts before month ends AND period ends after month starts
    p.startDate <= monthEnd && p.endDate >= monthStart
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    const color = getColorForType(formData.type, periods);
    
    if (isRecurring) {
      // Generate recurring periods
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const repeatEndDate = new Date(repeatUntil);
      const periodDuration = differenceInDays(endDate, startDate);
      
      let currentStart = new Date(startDate);
      
      while (currentStart <= repeatEndDate) {
        const currentEnd = new Date(currentStart);
        currentEnd.setDate(currentEnd.getDate() + periodDuration);
        
        // Don't create period if it would extend beyond repeatUntil
        if (currentEnd > repeatEndDate) break;
        
        onAddPeriod({
          name: '',
          type: formData.type,
          startDate: new Date(currentStart),
          endDate: currentEnd,
          color: color,
          description: formData.description
        });
        
        // Calculate next occurrence
        if (recurrenceFrequency === 'weekly') {
          currentStart = addWeeks(currentStart, 1);
        } else if (recurrenceFrequency === 'biweekly') {
          currentStart = addWeeks(currentStart, 2);
        } else if (recurrenceFrequency === 'monthly') {
          currentStart = addMonths(currentStart, 1);
        }
      }
      
      // Reset recurrence settings
      setIsRecurring(false);
      setRecurrenceFrequency('biweekly');
      setRepeatUntil(format(addMonths(new Date(), 6), 'yyyy-MM-dd'));
    } else {
      // Single period
      const newPeriod = {
        name: '',
        type: formData.type,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        color: color,
        description: formData.description
      };
      onAddPeriod(newPeriod);
    }
    
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
    if (!formData.startDate || !formData.endDate) return;

    const color = getColorForType(formData.type, periods);
    onUpdatePeriod(id, {
      name: '',
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
    setIsRecurring(false);
    setRecurrenceFrequency('biweekly');
    setRepeatUntil(format(addMonths(new Date(), 6), 'yyyy-MM-dd'));
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
            <label className="block text-sm font-medium text-text-primary mb-1">Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green text-sm bg-bg-surface text-text-primary"
              autoFocus
            >
              {periodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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

          {/* Recurring Options - Only show when creating new periods */}
          {!editingId && (
            <div className="border-t border-border-subtle pt-3 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="period-recurring-checkbox"
                  checked={isRecurring}
                  onChange={e => setIsRecurring(e.target.checked)}
                  className="w-4 h-4 rounded border-border-subtle bg-bg-surface text-acid-green focus:ring-2 focus:ring-acid-green"
                />
                <label htmlFor="period-recurring-checkbox" className="text-sm font-medium text-text-primary cursor-pointer">
                  Create recurring periods
                </label>
              </div>

              {isRecurring && (
                <div className="grid grid-cols-2 gap-3 pl-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Frequency</label>
                    <select
                      value={recurrenceFrequency}
                      onChange={e => setRecurrenceFrequency(e.target.value as 'weekly' | 'biweekly' | 'monthly')}
                      className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary text-sm"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly (every 2 weeks)</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Repeat until</label>
                    <input
                      type="date"
                      value={repeatUntil}
                      onChange={e => setRepeatUntil(e.target.value)}
                      className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors text-sm"
            >
              <Check className="w-4 h-4" />
              {editingId ? 'Update' : isRecurring ? 'Add Recurring Periods' : 'Add'} Period
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
                  <h4 className="font-medium text-text-primary">{period.type}</h4>
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
