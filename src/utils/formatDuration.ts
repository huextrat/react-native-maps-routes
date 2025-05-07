export const formatDuration = (durationString: string): string => {
  const duration = Number.parseInt(durationString.replace("s", ""), 10);
  if (Number.isNaN(duration) || duration <= 0) {
    return "Invalid duration";
  }
  const hours = Math.floor(duration / 3600);
  const minutes = Math.ceil((duration % 3600) / 60);
  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
};
