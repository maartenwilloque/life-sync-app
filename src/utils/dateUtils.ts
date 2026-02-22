import { isToday, isTomorrow, isThisWeek, format } from 'date-fns';

export const formatItemDate = (date: Date): string => {
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  if (isThisWeek(d)) return format(d, 'EEEE');
  return format(d, 'MMM d, yyyy');
};

export const formatItemTime = (date: Date): string => {
  return format(new Date(date), 'HH:mm');
};

export const getItemsForDate = (items: any[], date: Date) => {
  const targetDate = new Date(date);
  return items.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === targetDate.toDateString();
  });
};

export const sortByDate = (items: any[]) => {
  return [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
