import { addMethod, date, DateSchema } from 'yup';

addMethod<DateSchema>(date, 'fromString', function fromString() {
  return this.transform((value, originalValue) => {
    if (/\d{2}\/\d{2}\/\d{4}/g.test(originalValue)) {
      const [day, month, year] = originalValue.split('/');
      return new Date(`${year}-${month}-${day}T00:00`);
    }

    return originalValue.length > 0 ? 'Invalid Date' : '';
  });
});

declare module 'yup' {
  interface DateSchema {
    fromString(): DateSchema;
  }
}

export { date };
