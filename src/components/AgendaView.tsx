import React, { useState } from 'react';
import { format } from 'date-fns';
import { useStore } from '../hooks/useStore';
import { MonthOverview } from './MonthOverview';
import { PeriodsManager } from './PeriodsManager';

export const AgendaView: React.FC = () => {
  const { agenda, addAgendaItem, updateAgendaItem, removeAgendaItem, periods, addPeriod, updatePeriod, removePeriod, periodTypes, agendaTypes } = useStore();
  const [newItemText, setNewItemText] = useState('');
  const [newDate, setNewDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [newTime, setNewTime] = useState('09:00');
  const [newCategory, setNewCategory] = useState<'WORK' | 'PRIVATE'>('WORK');
  const [newType, setNewType] = useState('Task');
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="md:ml-20 pb-20 md:pb-0">
      {/* Periods Manager */}
      <div className="p-4 md:p-6">
        <PeriodsManager 
          periods={periods}
          periodTypes={periodTypes}
          onAddPeriod={addPeriod}
          onUpdatePeriod={updatePeriod}
          onRemovePeriod={removePeriod}
        />
      </div>

      {/* Month Overview with Add Button */}
      <div className="p-4 md:p-6">
        <MonthOverview 
          items={agenda} 
          periods={periods} 
          onUpdateItem={updateAgendaItem} 
          onDeleteItem={removeAgendaItem}
          isFormOpen={isFormOpen}
          onFormToggle={setIsFormOpen}
          onAddItem={addAgendaItem}
          formData={{
            title: newItemText,
            date: new Date(newDate),
            time: newTime,
            type: newType,
            category: newCategory
          }}
          onFormDataChange={(key, value) => {
            if (key === 'title') setNewItemText(value);
            if (key === 'date') setNewDate(format(value, 'yyyy-MM-dd'));
            if (key === 'time') setNewTime(value);
            if (key === 'type') setNewType(value);
            if (key === 'category') setNewCategory(value);
          }}
          agendaTypes={agendaTypes}
        />
      </div>
    </div>
  );
};
