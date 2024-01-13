//fonction to format time
export const formatLastMessageTime = (date: any) => {
  const now = new Date();
  const timetoformat = new Date(date);
  const diff = now.getTime() - timetoformat.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return timetoformat.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (hours < 48 && hours > 24) {
    return `yesterday `;
  } else {
    return timetoformat.toLocaleDateString("en-GB");
  }
};

// functions to encrypt and decrypt messages
