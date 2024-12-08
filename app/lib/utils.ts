export const getDefaultStartDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Formats as 'YYYY-MM-DD'
};

export const getDefaultEndDate = () => {
  const today = new Date();
  const threeMonthsLater = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );
  return threeMonthsLater.toISOString().split('T')[0]; // Formats as 'YYYY-MM-DD'
};

export const getDefaultCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // Extracts 'HH:mm:ss'
};

export const getTimeBefore15Minutes = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 15); // Subtract 15 minutes
  return now.toTimeString().split(' ')[0]; // Extract 'HH:mm:ss'
};

