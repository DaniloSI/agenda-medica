export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions
): string =>
  new Intl.DateTimeFormat('pt-BR', options).format(
    typeof date === 'string' ? new Date(date) : date
  );
