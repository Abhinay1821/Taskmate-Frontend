export const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    // Options for formatting date and time
    const options = {
      year: 'numeric',
      month: 'long',  // 'short' for abbreviated month
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,  // Set to false if you want 24-hour time format
    };
  
    // Format the date
    return date.toLocaleString('en-US', options);
  };
  