import { format, parse, isValid } from 'date-fns';

export const formatDateForDisplay = (dateStr: string): string => {
  // Input from date picker is usually YYYY-MM-DD
  // We need to convert it to "MMM DD, YYYY" (e.g., DEC 06, 2021)
  try {
    const date = new Date(dateStr);
    // If it's already in the display format (from mock data), return it
    if (dateStr.match(/[A-Z]{3} \d{2}, \d{4}/)) return dateStr;
    
    // Check if valid date
    if (isNaN(date.getTime())) return dateStr;

    // Manual format to ensure uppercase Month
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch (e) {
    return dateStr;
  }
};

export const parseDateForInput = (displayDate: string): string => {
  // Converts "DEC 06, 2021" back to "2021-12-06" for input type="date"
  try {
    const months: Record<string, string> = {
      JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
      JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    };
    
    // Attempt to split by space/comma
    // Format: MMM DD, YYYY
    const parts = displayDate.replace(',', '').split(' ');
    if (parts.length === 3) {
      const month = months[parts[0]];
      const day = parts[1];
      const year = parts[2];
      if (month && day && year) {
        return `${year}-${month}-${day}`;
      }
    }
    return '';
  } catch (e) {
    return '';
  }
};

export const isExpired = (expirationDateStr: string): boolean => {
  // Expiration date format: MMM DD, YYYY
  // We need to compare with today
  const inputDate = parseDateForInput(expirationDateStr);
  if (!inputDate) return false; // Assume not expired if invalid for safety
  
  const exp = new Date(inputDate);
  const now = new Date();
  
  // Reset time for accurate day comparison
  now.setHours(0,0,0,0);
  exp.setHours(0,0,0,0);
  
  return exp < now;
};