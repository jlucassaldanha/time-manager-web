export function parseDurationToMinutes(duration: string | number | undefined | null): number {
  if (!duration) return 0;

  if (typeof duration === "number") return duration;

  if (typeof duration === "string") {
    if (duration.includes(":")) {
      const parts = duration.split(":");
      const hours = Number(parts[0]) || 0;
      const minutes = Number(parts[1]) || 0;
      return (hours * 60) + minutes;
    }
    return Number(duration) || 0;
  }

  return 0;
}