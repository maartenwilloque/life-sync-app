export type Category = 'WORK' | 'PRIVATE';

export interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  date: Date;
  type: string; // Dynamic type (e.g., "Task", "Meeting", "Call")
  category: Category;
  completed: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity?: number;
  category?: string;
  completed: boolean;
}

export interface Period {
  id: string;
  name: string;
  type: string; // e.g., "kids", "vacation", "custody"
  startDate: Date;
  endDate: Date;
  color: string;
  description?: string;
}