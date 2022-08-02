export function determineTime() {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  switch (true) {
    case time > "4:00" && time < "12:00":
      return "Morning" as const;

    case time > "12:00" && time < "18:00":
      return "Noon" as const;

    case time > "18:00" && time < "20:00":
      return "Evening" as const;

    case time > "20:00" && time < "24:00":
      return "Night" as const;

    case time > "0:00" && time < "4:00":
      return "Midnight" as const;

    default:
      return "Morning" as const;
  }
}
