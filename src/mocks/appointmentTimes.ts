const appointmentTimes = Array.from({ length: 23 }, (_, i) =>
  (i + 1).toString().padStart(2, '0')
)
  .map((day) => ({
    date: `2023-05-${day}T00:00`,
    times: Array.from({ length: 9 }, (_, i) => i + (i > 3 ? 9 : 8))
      .map((n) => n.toString().padStart(2, '0'))
      .flatMap((hour) => [`${hour}:00`, `${hour}:30`]),
  }))
  .map((day) => ({ ...day, date: new Date(day.date) }));

export default appointmentTimes;
