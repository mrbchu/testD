export const generateICS = (
  userName: string,
  dateType: string,
  dateTime?: Date
): string => {
  const now = new Date();
  const startDate = dateTime || new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  };

  const formatDateLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Date Planner App//Date Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Date Planner Events',
    'X-WR-TIMEZONE:UTC',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@dateplannerapp.com`,
    `DTSTAMP:${formatDate(now)}`,
    `DTSTART:${formatDateLocal(startDate)}`,
    `DTEND:${formatDateLocal(endDate)}`,
    `SUMMARY:Date Night - ${dateType}`,
    `DESCRIPTION:Our special date planned with Date Planner App!\\n\\nDate Type: ${dateType}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return ics;
};

export const downloadICS = (userName: string, dateType: string) => {
  const icsContent = generateICS(userName, dateType);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = `date-plan-${Date.now()}.ics`;
  link.click();

  URL.revokeObjectURL(link.href);
};
