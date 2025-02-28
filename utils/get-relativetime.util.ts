const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

const parseDateString = (dateStr: string): Date => {
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/');
    return new Date(+year, +month - 1, +day);
  }
  return new Date(dateStr);
};

export const getRelativeTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();

  const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  console.log('now', dateWithoutTime, nowWithoutTime);

  if (dateWithoutTime.getTime() === nowWithoutTime.getTime()) {
    return 'now';
  }

  const diff = dateWithoutTime.getTime() - nowWithoutTime.getTime();
  const diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(diffInDays / 7);

  if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, 'day');
  }
  return rtf.format(diffInWeeks, 'week');
}