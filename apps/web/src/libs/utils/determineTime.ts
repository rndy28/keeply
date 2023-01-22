export function determineTime() {
  const hour = new Date().getHours();
  switch (true) {
    case hour >= 4 && hour <= 12:
      return "Morning" as const;

    case hour >= 12 && hour <= 17:
      return "Afternoon" as const;

    case hour >= 17 && hour <= 20:
      return "Evening" as const;

    case hour >= 20 && hour <= 24:
      return "Night" as const;

    case hour >= 24 || (hour >= 1 && hour <= 4):
      return "Midnight" as const;
  }
}
