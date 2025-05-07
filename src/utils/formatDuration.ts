export const formatDuration = (
  durationString: string | null | undefined,
): number => {
  if (!durationString || typeof durationString !== "string") {
    return 0;
  }
  const durationInSeconds = Number.parseInt(
    durationString.replace(/s$/, ""),
    10,
  );
  if (Number.isNaN(durationInSeconds) || durationInSeconds <= 0) {
    return 0;
  }
  return durationInSeconds * 1000;
};
