import { formatCurrency, formatDate } from './formatters';

test('should return formatted currency', () => {
  const number = 20.4
  const currency = formatCurrency(number);

  expect(currency).toBe('$20.40')
})

test('should return formatted date ignoring timezone', () => {
  const options = {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Buenos_Aires",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = formatDate('2024-04-02', options)

  expect(formattedDate).toBe('Apr 2, 12:00 AM')
})
