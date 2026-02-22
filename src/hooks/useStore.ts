import { useState, useEffect } from 'react';
import type { AgendaItem, ShoppingItem, Period } from '../types';

export const useStore = () => {
  // Initialize from LocalStorage or empty arrays
  const [agenda, setAgenda] = useState<AgendaItem[]>(() => {
    const saved = localStorage.getItem('agenda');
    return saved ? JSON.parse(saved, (key, value) => key === 'date' ? new Date(value) : value) : [];
  });

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shopping');
    return saved ? JSON.parse(saved) : [];
  });

  const [periods, setPeriods] = useState<Period[]>(() => {
    const saved = localStorage.getItem('periods');
    return saved ? JSON.parse(saved, (key, value) => (key === 'startDate' || key === 'endDate') ? new Date(value) : value) : [];
  });

  const [periodTypes, setPeriodTypes] = useState<string[]>(() => {
    const saved = localStorage.getItem('periodTypes');
    return saved ? JSON.parse(saved) : ['Kids with me', 'Vacation', 'Work project', 'Travel', 'Other'];
  });

  const [agendaTypes, setAgendaTypes] = useState<string[]>(() => {
    const saved = localStorage.getItem('agendaTypes');
    return saved ? JSON.parse(saved) : ['Task', 'Meeting', 'Call', 'Appointment', 'Event'];
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('agenda', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    localStorage.setItem('shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('periods', JSON.stringify(periods));
  }, [periods]);

  useEffect(() => {
    localStorage.setItem('periodTypes', JSON.stringify(periodTypes));
  }, [periodTypes]);

  useEffect(() => {
    localStorage.setItem('agendaTypes', JSON.stringify(agendaTypes));
  }, [agendaTypes]);

  // Actions for Agenda
  const addAgendaItem = (item: Omit<AgendaItem, 'id'>) => {
    const newItem = { ...item, id: crypto.randomUUID() };
    setAgenda(prev => [...prev, newItem].sort((a, b) => a.date.getTime() - b.date.getTime()));
  };

  const toggleAgendaItem = (id: string) => {
    setAgenda(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const removeAgendaItem = (id: string) => {
    setAgenda(prev => prev.filter(item => item.id !== id));
  };

  const updateAgendaItem = (id: string, updates: Partial<AgendaItem>) => {
    setAgenda(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  // Actions for Shopping List
  const addShoppingItem = (name: string) => {
    setShoppingList(prev => [...prev, { id: crypto.randomUUID(), name, completed: false }]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const clearShoppingCompleted = () => {
    setShoppingList(prev => prev.filter(item => !item.completed));
  };

  // Actions for Periods
  const addPeriod = (period: Omit<Period, 'id'>) => {
    const newPeriod = { ...period, id: crypto.randomUUID() };
    setPeriods(prev => [...prev, newPeriod].sort((a, b) => a.startDate.getTime() - b.startDate.getTime()));
  };

  const updatePeriod = (id: string, updates: Partial<Period>) => {
    setPeriods(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removePeriod = (id: string) => {
    setPeriods(prev => prev.filter(p => p.id !== id));
  };

  // Actions for Period Types
  const addPeriodType = (type: string) => {
    if (type.trim() && !periodTypes.includes(type.trim())) {
      setPeriodTypes(prev => [...prev, type.trim()]);
    }
  };

  const removePeriodType = (type: string) => {
    setPeriodTypes(prev => prev.filter(t => t !== type));
  };

  // Actions for Agenda Types
  const addAgendaType = (type: string) => {
    if (type.trim() && !agendaTypes.includes(type.trim())) {
      setAgendaTypes(prev => [...prev, type.trim()]);
    }
  };

  const removeAgendaType = (type: string) => {
    setAgendaTypes(prev => prev.filter(t => t !== type));
  };

  return {
    agenda,
    shoppingList,
    periods,
    periodTypes,
    agendaTypes,
    addAgendaItem,
    toggleAgendaItem,
    removeAgendaItem,
    updateAgendaItem,
    addShoppingItem,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingCompleted,
    addPeriod,
    updatePeriod,
    removePeriod,
    addPeriodType,
    removePeriodType,
    addAgendaType,
    removeAgendaType
  };
};