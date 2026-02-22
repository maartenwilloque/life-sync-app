import { useState, useEffect } from 'react';
import type { AgendaItem, ShoppingItem, Period } from '../types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, query, where, onSnapshot, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import {
  onAgendaItemsChange,
  addAgendaItem as fbAddAgendaItem,
  updateAgendaItem as fbUpdateAgendaItem,
  deleteAgendaItem as fbDeleteAgendaItem,
  onPeriodsChange,
  addPeriod as fbAddPeriod,
  updatePeriod as fbUpdatePeriod,
  deletePeriod as fbDeletePeriod,
  onShoppingItemsChange,
  addShoppingItem as fbAddShoppingItem,
  updateShoppingItem as fbUpdateShoppingItem,
  deleteShoppingItem as fbDeleteShoppingItem,
  onUserSettingsChange,
  updateUserSettings
} from '../services/firebaseService';

export const useStore = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // Set up Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Initialize user settings when user first signs in (only if they don't exist)
  useEffect(() => {
    if (!currentUser) return;

    const initSettings = async () => {
      try {
        // Check if settings already exist in FireStore
        const q = query(
          collection(db, 'userSettings'),
          where('userId', '==', currentUser.uid)
        );

        const snapshot = await new Promise<QuerySnapshot<DocumentData>>(resolve => {
          const unsubscribe = onSnapshot(q, resolve);
          unsubscribe();
        });

        // Only initialize if user doesn't have settings yet
        if (snapshot.empty) {
          await updateUserSettings(
            currentUser.uid,
            periodTypes,
            agendaTypes
          );
          console.log('✅ User settings initialized in Firebase (new user)');
        }
      } catch (error) {
        console.error('Failed to initialize user settings:', error);
      }
    };

    initSettings();
  }, [currentUser]); // Only run once when user first signs in

  // Set up real-time listeners for Firebase when user is logged in
  useEffect(() => {
    if (!currentUser) return;

    const unsubAgenda = onAgendaItemsChange(currentUser.uid, setAgenda);
    const unsubPeriods = onPeriodsChange(currentUser.uid, setPeriods);
    const unsubShopping = onShoppingItemsChange(currentUser.uid, setShoppingList);
    const unsubSettings = onUserSettingsChange(currentUser.uid, (periodTypes, agendaTypes) => {
      // Only update from Firebase if there's actual data
      if (periodTypes.length > 0) {
        setPeriodTypes(periodTypes);
      }
      if (agendaTypes.length > 0) {
        setAgendaTypes(agendaTypes);
      }
    });

    return () => {
      unsubAgenda();
      unsubPeriods();
      unsubShopping();
      unsubSettings();
    };
  }, [currentUser]);

  // Sync to LocalStorage whenever state changes (backup)
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

  // Agenda operations
  const addAgendaItem = (item: Omit<AgendaItem, 'id'>) => {
    if (currentUser) {
      fbAddAgendaItem(currentUser.uid, item).catch(error => {
        console.error('Failed to add agenda item:', error);
        // Fall back to localStorage on Firebase error
        const newItem: AgendaItem = { ...item, id: crypto.randomUUID() };
        setAgenda(prev => [...prev, newItem].sort((a, b) => a.date.getTime() - b.date.getTime()));
      });
    } else {
      const newItem: AgendaItem = { ...item, id: crypto.randomUUID() };
      setAgenda(prev => [...prev, newItem].sort((a, b) => a.date.getTime() - b.date.getTime()));
    }
  };

  const toggleAgendaItem = (id: string) => {
    const item = agenda.find(i => i.id === id);
    if (currentUser && item) {
      fbUpdateAgendaItem(id, { ...item, completed: !item.completed }).catch(error => {
        console.error('Failed to toggle agenda item:', error);
      });
    } else {
      setAgenda(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    }
  };

  const removeAgendaItem = (id: string) => {
    if (currentUser) {
      fbDeleteAgendaItem(id).catch(error => {
        console.error('Failed to delete agenda item:', error);
      });
    } else {
      setAgenda(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateAgendaItem = (id: string, updates: Partial<AgendaItem>) => {
    if (currentUser) {
      fbUpdateAgendaItem(id, updates).catch(error => {
        console.error('Failed to update agenda item:', error);
      });
    } else {
      setAgenda(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    }
  };

  // Shopping operations
  const addShoppingItem = (name: string) => {
    if (currentUser) {
      fbAddShoppingItem(currentUser.uid, { name, completed: false }).catch(error => {
        console.error('Failed to add shopping item:', error);
        setShoppingList(prev => [...prev, { id: crypto.randomUUID(), name, completed: false }]);
      });
    } else {
      setShoppingList(prev => [...prev, { id: crypto.randomUUID(), name, completed: false }]);
    }
  };

  const toggleShoppingItem = (id: string) => {
    const item = shoppingList.find(i => i.id === id);
    if (currentUser && item) {
      fbUpdateShoppingItem(id, { completed: !item.completed }).catch(error => {
        console.error('Failed to toggle shopping item:', error);
      });
    } else {
      setShoppingList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    }
  };

  const removeShoppingItem = (id: string) => {
    if (currentUser) {
      fbDeleteShoppingItem(id).catch(error => {
        console.error('Failed to delete shopping item:', error);
      });
    } else {
      setShoppingList(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearShoppingCompleted = () => {
    const completedIds = shoppingList.filter(item => item.completed).map(item => item.id);
    completedIds.forEach(id => {
      if (currentUser) {
        fbDeleteShoppingItem(id).catch(error => {
          console.error('Failed to delete shopping item:', error);
        });
      }
    });
    setShoppingList(prev => prev.filter(item => !item.completed));
  };

  // Period operations
  const addPeriod = (period: Omit<Period, 'id'>) => {
    if (currentUser) {
      fbAddPeriod(currentUser.uid, period).catch(error => {
        console.error('Failed to add period:', error);
        const newPeriod: Period = { ...period, id: crypto.randomUUID() };
        setPeriods(prev => [...prev, newPeriod].sort((a, b) => a.startDate.getTime() - b.startDate.getTime()));
      });
    } else {
      const newPeriod: Period = { ...period, id: crypto.randomUUID() };
      setPeriods(prev => [...prev, newPeriod].sort((a, b) => a.startDate.getTime() - b.startDate.getTime()));
    }
  };

  const updatePeriod = (id: string, updates: Partial<Period>) => {
    if (currentUser) {
      fbUpdatePeriod(id, updates).catch(error => {
        console.error('Failed to update period:', error);
      });
    } else {
      setPeriods(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  };

  const removePeriod = (id: string) => {
    if (currentUser) {
      fbDeletePeriod(id).catch(error => {
        console.error('Failed to delete period:', error);
      });
    } else {
      setPeriods(prev => prev.filter(p => p.id !== id));
    }
  };

  // Period types management
  const addPeriodType = (type: string) => {
    const trimmedType = type.trim();
    if (trimmedType && !periodTypes.includes(trimmedType)) {
      const newTypes = [...periodTypes, trimmedType];
      setPeriodTypes(newTypes);
      if (currentUser) {
        updateUserSettings(currentUser.uid, newTypes, agendaTypes).catch(error => {
          console.error('Failed to update period types:', error);
        });
      }
    }
  };

  const removePeriodType = (type: string) => {
    const newTypes = periodTypes.filter(t => t !== type);
    setPeriodTypes(newTypes);
    if (currentUser) {
      updateUserSettings(currentUser.uid, newTypes, agendaTypes).catch(error => {
        console.error('Failed to remove period type:', error);
      });
    }
  };

  // Agenda types management
  const addAgendaType = (type: string) => {
    const trimmedType = type.trim();
    if (trimmedType && !agendaTypes.includes(trimmedType)) {
      const newTypes = [...agendaTypes, trimmedType];
      setAgendaTypes(newTypes);
      if (currentUser) {
        updateUserSettings(currentUser.uid, periodTypes, newTypes).catch(error => {
          console.error('Failed to add agenda type:', error);
        });
      }
    }
  };

  const removeAgendaType = (type: string) => {
    const newTypes = agendaTypes.filter(t => t !== type);
    setAgendaTypes(newTypes);
    if (currentUser) {
      updateUserSettings(currentUser.uid, periodTypes, newTypes).catch(error => {
        console.error('Failed to remove agenda type:', error);
      });
    }
  };

  return {
    currentUser,
    isLoading,
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