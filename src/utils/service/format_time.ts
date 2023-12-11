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
    const time = timetoformat.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return time;
  } else if (hours < 48 && hours > 24) {
    return ` yesterday,`;
  } else {
    const day = timetoformat.toLocaleString("en-US", { weekday: "long" });

    return `${day}`;
  }
};
