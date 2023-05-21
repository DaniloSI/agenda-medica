import { addMethod, date, DateSchema, string, StringSchema } from 'yup';

addMethod<DateSchema>(date, 'fromString', function fromString() {
  return this.transform((_, originalValue) => {
    if (/\d{2}\/\d{2}\/\d{4}/g.test(originalValue)) {
      const [day, month, year] = originalValue.split('/');
      return new Date(`${year}-${month}-${day}T00:00`);
    }

    return originalValue.length > 0 ? 'Invalid Date' : '';
  });
});

addMethod<StringSchema>(string, 'phone', function phone() {
  return this.transform((_, originalValue) =>
    originalValue.slice(5).replace(/\D/g, '')
  );
});

declare module 'yup' {
  interface DateSchema {
    fromString(): DateSchema;
  }
  interface StringSchema {
    phone(): StringSchema;
  }
}

export { date, string };
