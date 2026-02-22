import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  type QuerySnapshot,
  type DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { AgendaItem, Period, ShoppingItem } from '../types';

export interface FirebaseUser {
  uid: string;
  email: string;
}

/**
 * Set up real-time listener for agenda items
 */
export function onAgendaItemsChange(
  userId: string,
  callback: (items: AgendaItem[]) => void
) {
  const q = query(
    collection(db, 'agendaItems'),
    where('userId', '==', userId)
  );

  let lastCallbackData: string = '';
  
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const items = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
        type: data.type,
        category: data.category,
        completed: data.completed
      } as AgendaItem;
    });
    
    // Prevent race conditions: only callback if data actually changed
    const currentData = JSON.stringify(items);
    if (currentData !== lastCallbackData) {
      lastCallbackData = currentData;
      callback(items);
    }
  });
}

/**
 * Add agenda item to Firestore
 */
export async function addAgendaItem(userId: string, item: Omit<AgendaItem, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'agendaItems'), {
      ...item,
      userId,
      date: Timestamp.fromDate(item.date),
      createdAt: Timestamp.now()
    });
    console.log('✅ Agenda item added to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding agenda item to Firebase:', error);
    throw error;
  }
}

/**
 * Update agenda item in Firestore
 */
export async function updateAgendaItem(itemId: string, updates: Partial<AgendaItem>) {
  const itemRef = doc(db, 'agendaItems', itemId);
  await updateDoc(itemRef, {
    ...updates,
    ...(updates.date && { date: Timestamp.fromDate(updates.date) })
  });
}

/**
 * Delete agenda item from Firestore
 */
export async function deleteAgendaItem(itemId: string) {
  await deleteDoc(doc(db, 'agendaItems', itemId));
}

/**
 * Set up real-time listener for periods
 */
export function onPeriodsChange(
  userId: string,
  callback: (periods: Period[]) => void
) {
  const q = query(
    collection(db, 'periods'),
    where('userId', '==', userId)
  );

  let lastCallbackData: string = '';
  
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const periods = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        type: data.type,
        startDate: data.startDate instanceof Timestamp ? data.startDate.toDate() : new Date(data.startDate),
        endDate: data.endDate instanceof Timestamp ? data.endDate.toDate() : new Date(data.endDate),
        color: data.color,
        description: data.description
      } as Period;
    });
    
    // Prevent race conditions: only callback if data actually changed
    const currentData = JSON.stringify(periods);
    if (currentData !== lastCallbackData) {
      lastCallbackData = currentData;
      callback(periods);
    }
  });
}

/**
 * Add period to Firestore
 */
export async function addPeriod(userId: string, period: Omit<Period, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'periods'), {
      ...period,
      userId,
      startDate: Timestamp.fromDate(period.startDate),
      endDate: Timestamp.fromDate(period.endDate),
      createdAt: Timestamp.now()
    });
    console.log('✅ Period added to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding period to Firebase:', error);
    throw error;
  }
}

/**
 * Update period in Firestore
 */
export async function updatePeriod(periodId: string, updates: Partial<Period>) {
  const periodRef = doc(db, 'periods', periodId);
  await updateDoc(periodRef, {
    ...updates,
    ...(updates.startDate && { startDate: Timestamp.fromDate(updates.startDate) }),
    ...(updates.endDate && { endDate: Timestamp.fromDate(updates.endDate) })
  });
}

/**
 * Delete period from Firestore
 */
export async function deletePeriod(periodId: string) {
  await deleteDoc(doc(db, 'periods', periodId));
}

/**
 * Set up real-time listener for shopping items
 */
export function onShoppingItemsChange(
  userId: string,
  callback: (items: ShoppingItem[]) => void
) {
  const q = query(
    collection(db, 'shoppingItems'),
    where('userId', '==', userId)
  );

  let lastCallbackData: string = '';
  
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ShoppingItem));
    
    // Prevent race conditions: only callback if data actually changed
    const currentData = JSON.stringify(items);
    if (currentData !== lastCallbackData) {
      lastCallbackData = currentData;
      callback(items);
    }
  });
}

/**
 * Add shopping item to Firestore
 */
export async function addShoppingItem(userId: string, item: Omit<ShoppingItem, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'shoppingItems'), {
      ...item,
      userId,
      createdAt: Timestamp.now()
    });
    console.log('✅ Shopping item added to Firebase:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding shopping item to Firebase:', error);
    throw error;
  }
}

/**
 * Update shopping item in Firestore
 */
export async function updateShoppingItem(itemId: string, updates: Partial<ShoppingItem>) {
  const itemRef = doc(db, 'shoppingItems', itemId);
  await updateDoc(itemRef, updates);
}

/**
 * Delete shopping item from Firestore
 */
export async function deleteShoppingItem(itemId: string) {
  await deleteDoc(doc(db, 'shoppingItems', itemId));
}

/**
 * Set up real-time listener for user settings and types
 */
export function onUserSettingsChange(
  userId: string,
  callback: (periodTypes: string[], agendaTypes: string[]) => void
) {
  const q = query(
    collection(db, 'userSettings'),
    where('userId', '==', userId)
  );

  let lastCallbackData: string = '';

  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      const periodTypes = data.periodTypes || [];
      const agendaTypes = data.agendaTypes || [];
      
      // Prevent race conditions: only callback if data actually changed
      const currentData = JSON.stringify({ periodTypes, agendaTypes });
      if (currentData !== lastCallbackData) {
        lastCallbackData = currentData;
        callback(periodTypes, agendaTypes);
      }
    }
  });
}

/**
 * Update user settings (period and agenda types)
 */
export async function updateUserSettings(
  userId: string,
  periodTypes: string[],
  agendaTypes: string[]
) {
  try {
    const q = query(
      collection(db, 'userSettings'),
      where('userId', '==', userId)
    );

    const snapshot = await new Promise<QuerySnapshot<DocumentData>>(resolve => {
      const unsubscribe = onSnapshot(q, resolve);
      unsubscribe();
    });

    if (!snapshot.empty) {
      const settingsRef = doc(db, 'userSettings', snapshot.docs[0].id);
      await updateDoc(settingsRef, { periodTypes, agendaTypes });
      console.log('✅ User settings updated in Firebase');
    } else {
      await addDoc(collection(db, 'userSettings'), {
        userId,
        periodTypes,
        agendaTypes,
        createdAt: Timestamp.now()
      });
      console.log('✅ User settings created in Firebase');
    }
  } catch (error) {
    console.error('❌ Error updating user settings in Firebase:', error);
    throw error;
  }
}
