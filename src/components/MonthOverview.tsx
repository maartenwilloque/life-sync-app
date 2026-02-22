import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, addMonths, subMonths, isWithinInterval } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Briefcase, Circle, Trash2, Save, X } from 'lucide-react';
import type { AgendaItem, Period } from '../types';

interface MonthOverviewProps {
  items: AgendaItem[];
  periods?: Period[];
  onUpdateItem?: (id: string, updates: Partial<AgendaItem>) => void;
  onDeleteItem?: (id: string) => void;
  isFormOpen?: boolean;
  onFormToggle?: (open: boolean) => void;
  onAddItem?: (item: Omit<AgendaItem, 'id'>) => void;
  formData?: {
    title: string;
    date: Date;
    time: string;
    type: string;
    category: 'WORK' | 'PRIVATE';
  };
  onFormDataChange?: (key: string, value: any) => void;
  agendaTypes?: string[];
}

export const MonthOverview: React.FC<MonthOverviewProps> = ({ 
  items, 
  periods = [], 
  onUpdateItem, 
  onDeleteItem,
  isFormOpen = false,
  onFormToggle,
  onAddItem,
  formData,
  onFormDataChange,
  agendaTypes = []
}) => {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<AgendaItem>>({});
  
  const monthStart = startOfMonth(displayMonth);
  const monthEnd = endOfMonth(displayMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get first day of week (0 = Sunday, 1 = Monday, etc)
  let startingDayOfWeek = getDay(monthStart) - 1; // Convert to Monday = 0
  if (startingDayOfWeek < 0) startingDayOfWeek = 6; // Sunday becomes 6
  
  // Create array with empty slots for days before month starts
  const calendarDays = [
    ...Array(startingDayOfWeek).fill(null),
    ...daysInMonth
  ];

  // Get items by date
  const getItemsForDate = (date: Date) => {
    return items.filter(item => isSameDay(new Date(item.date), date));
  };

  // Get selected day items
  const selectedDayItems = selectedDay ? getItemsForDate(selectedDay) : [];

  const getIndicatorColor = (date: Date) => {
    const dateItems = getItemsForDate(date);
    if (dateItems.length === 0) return 'bg-bg-surface';
    
    const hasWork = dateItems.some(item => item.category === 'WORK');
    const hasPrivate = dateItems.some(item => item.category === 'PRIVATE');
    
    if (hasWork && hasPrivate) return 'bg-acid-green-dim border-acid-green';
    if (hasWork) return 'bg-acid-green-dim border-acid-green';
    return 'bg-crimson-dim border-crimson';
  };

  const getPeriodForDate = (date: Date): Period | undefined => {
    return periods.find(p => isWithinInterval(date, { start: p.startDate, end: p.endDate }));
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleDayClick = (date: Date) => {
    setSelectedDay(date);
    setEditingId(null);
  };

  const handleEditClick = (item: AgendaItem) => {
    setEditingId(item.id);
    setEditFormData({
      title: item.title,
      date: new Date(item.date),
      type: item.type,
      category: item.category,
      completed: item.completed
    });
  };

  const handleSaveEdit = (id: string) => {
    if (onUpdateItem && editFormData.title?.trim()) {
      onUpdateItem(id, editFormData);
    }
    setEditingId(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  return (
    <div className="bg-bg-card p-3 rounded-lg border border-border-subtle mb-4">
      {/* Add Item Button */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-mid">
        <h3 className="text-lg font-bold text-text-primary font-display">Agenda</h3>
        <button
          onClick={() => onFormToggle?.(!isFormOpen)}
          className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-3 py-1 rounded-md text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Agenda Item
        </button>
      </div>

      {/* Add Item Form */}
      {isFormOpen && formData && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.title && onAddItem) {
              const [hours, minutes] = formData.time.split(':');
              const date = new Date(formData.date);
              date.setHours(parseInt(hours), parseInt(minutes));
              onAddItem({
                title: formData.title,
                date,
                type: formData.type,
                category: formData.category,
                completed: false
              });
            }
          }}
          className="mb-4 space-y-4 p-4 bg-bg-elevated rounded-lg border border-border-subtle"
        >
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => onFormDataChange?.('title', e.target.value)}
              placeholder="Enter title..."
              className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary placeholder-text-muted"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
              <input
                type="date"
                value={format(formData.date, 'yyyy-MM-dd')}
                onChange={e => onFormDataChange?.('date', new Date(e.target.value))}
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={e => onFormDataChange?.('time', e.target.value)}
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Type</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {agendaTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onFormDataChange?.('type', type)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
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
                onChange={e => onFormDataChange?.('type', e.target.value)}
                placeholder="Or enter custom type..."
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary placeholder-text-muted"
              />
              <p className="text-xs text-text-muted mt-1">Manage types in Settings</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => onFormDataChange?.('category', e.target.value as 'WORK' | 'PRIVATE')}
                className="w-full px-3 py-2 border border-border-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
              >
                <option value="WORK">Work</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-acid-green hover:bg-yellow-300 text-bg-void px-4 py-2 rounded-md font-bold transition-colors"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={() => onFormToggle?.(false)}
              className="flex-1 bg-bg-surface hover:bg-bg-elevated text-text-primary px-4 py-2 rounded-md font-medium transition-colors border border-border-subtle"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      <div className="lg:grid lg:grid-cols-3 gap-4">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          {/* Header with month and navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setDisplayMonth(subMonths(displayMonth, 1))}
          className="p-1 hover:bg-bg-surface rounded transition-colors"
          title="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-text-secondary" />
        </button>
        
        <h3 className="text-sm font-bold text-text-primary font-display">
          {format(displayMonth, 'MMMM yyyy')}
        </h3>
        
        <button
          onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}
          className="p-1 hover:bg-bg-surface rounded transition-colors"
          title="Next month"
        >
          <ChevronRight className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-text-secondary py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 mb-3">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }

          const itemsForDate = getItemsForDate(date);
          const isToday = isSameDay(date, new Date());
          const isSelected = selectedDay && isSameDay(date, selectedDay);
          const dateInPeriod = getPeriodForDate(date);

          return (
            <button
              key={format(date, 'yyyy-MM-dd')}
              onClick={() => handleDayClick(date)}
              className={`aspect-square p-0.5 rounded-md text-xs font-medium cursor-pointer transition-all border border-border-subtle relative ${
                dateInPeriod 
                  ? `${dateInPeriod.color} opacity-75` 
                  : itemsForDate.length > 0 ? 'bg-bg-elevated' : 'bg-bg-card hover:bg-bg-elevated'
              } ${
                isToday ? 'ring-2 ring-[#F0F0F2]' : ''
              } ${isSelected ? 'ring-2 ring-acid-green' : 'hover:shadow-md'}`}
            >
              <div className="h-full flex flex-col items-center justify-center">
                <span className={`text-xs ${
                  isSelected && !dateInPeriod
                    ? 'font-bold text-acid-green'
                    : isToday
                      ? 'text-acid-green font-bold'
                      : 'text-text-primary'
                }`}>
                  {format(date, 'd')}
                </span>
                {itemsForDate.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {itemsForDate.length > 3 ? (
                      <div className="text-xs font-bold text-text-muted">
                        {itemsForDate.length}
                      </div>
                    ) : (
                      itemsForDate.map((item, idx) => (
                        <div
                          key={idx}
                          className={`w-1 h-1 rounded-full ${
                            item.category === 'WORK' ? 'bg-acid-green' : 'bg-crimson'
                          }`}
                        ></div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-3 text-xs text-text-secondary border-b border-border-subtle pb-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-acid-green"></div>
          <span>Private</span>
        </div>
        {periods.length > 0 && (
          <>
            <div className="h-4 border-l border-border-mid"></div>
            <span className="font-medium text-text-secondary">Periods:</span>
            {Array.from(new Set(periods.map(p => p.type))).map(type => {
              const period = periods.find(p => p.type === type);
              return period ? (
                <div key={type} className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded ${period.color.split(' ')[0]}`}></div>
                  <span>{type}</span>
                </div>
              ) : null;
            })}
          </>
        )}
      </div>
        </div>

        {/* Selected Day Items Section */}
        <div className="lg:col-span-1 mt-3 lg:mt-0">
          {selectedDay && (
            <div className="bg-bg-surface border-2 border-border-mid rounded-lg p-4">
          <h4 className="text-sm font-bold text-acid-green mb-3 font-display">
            {format(selectedDay, 'EEEE, MMMM d, yyyy')}
          </h4>
          
          {selectedDayItems.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-2">No items scheduled for this day</p>
          ) : (
            <div className="space-y-2">
              {selectedDayItems.map(item => (
                <div
                  key={item.id}
                  className={`p-2 rounded-md text-sm border-l-4 bg-bg-elevated ${
                    item.category === 'WORK' ? 'border-l-acid-green' : 'border-l-crimson'
                  }`}
                >
                  {editingId === item.id ? (
                    // Edit mode
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editFormData.title || ''}
                        onChange={e => setEditFormData({ ...editFormData, title: e.target.value })}
                        className="w-full px-2 py-1 border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="time"
                          value={format(new Date(editFormData.date || item.date), 'HH:mm')}
                          onChange={e => {
                            const [hours, minutes] = e.target.value.split(':');
                            const date = new Date(editFormData.date || item.date);
                            date.setHours(parseInt(hours), parseInt(minutes));
                            setEditFormData({ ...editFormData, date });
                          }}
                          className="px-2 py-1 border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
                        />
                        <select
                          value={editFormData.type || item.type}
                          onChange={e => setEditFormData({ ...editFormData, type: e.target.value })}
                          className="px-2 py-1 border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
                        >
                          <option value="TASK">Task</option>
                          <option value="MEETING">Meeting</option>
                        </select>
                        <select
                          value={editFormData.category || item.category}
                          onChange={e => setEditFormData({ ...editFormData, category: e.target.value as 'WORK' | 'PRIVATE' })}
                          className="px-2 py-1 border border-border-subtle rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-acid-green bg-bg-surface text-text-primary"
                        >
                          <option value="WORK">Work</option>
                          <option value="PRIVATE">Private</option>
                        </select>
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="flex-1 text-xs bg-acid-green hover:bg-yellow-300 text-bg-void px-2 py-1 rounded-md font-bold transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 text-xs bg-bg-card hover:bg-bg-elevated text-text-primary px-2 py-1 rounded-md font-medium transition-colors border border-border-subtle"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-text-primary">{item.title}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{format(new Date(item.date), 'HH:mm')} • {item.type}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-text-muted hover:text-acid-green transition-colors p-1"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteItem?.(item.id)}
                          className="text-text-muted hover:text-crimson transition-colors p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
          )}
        </div>
      </div>
    </div>
  );
};
