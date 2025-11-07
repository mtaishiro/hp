/**
 * Format a date string (YYYY-MM-DD) consistently for both server and client rendering
 * to prevent React hydration errors.
 * 
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {string} lang - Language code ('en' or 'ja')
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, lang) {
  // Parse the date string (YYYY-MM-DD format)
  const [year, month, day] = dateString.split('-').map(Number);
  
  if (lang === 'ja') {
    return `${year}年${month}月${day}日`;
  }
  
  // English format
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

