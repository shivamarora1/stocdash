import { isSameDay } from './date.utils';
import { extractString, formatNumberToEnglish } from './string.utils';

describe.each([
  { a: new Date(2024, 10, 27), b: new Date(2024, 10, 27), expected: true },
  {
    a: new Date(2024, 10, 27, 10, 30),
    b: new Date(2024, 10, 27, 15, 45),
    expected: true,
  },
  {
    a: new Date(2024, 10, 29),
    b: new Date(2024, 10, 27, 15, 45),
    expected: false,
  },
])('.isSameDay($a, $b)', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(isSameDay(a, b)).toBe(expected);
  });
});

describe.each([
  {
    regex: /value is: (\d+)/,
    content: 'The value is: 12345',
    expected: '12345',
  },
  {
    regex: /value is: (\d+)/,
    content: 'No value here',
    expected: 'N/A',
  },
  {
    regex: /(\$\d+\.\d{2})/,
    content: 'Price: $12.50',
    expected: '$12.50',
  },
])('.extractString($regex, $content)', ({ regex, content, expected }) => {
  test(`returns ${expected}`, () => {
    expect(extractString(regex, content)).toBe(expected);
  });
});

describe.each([
  {
    number: 1234567,
    expected: '1,234,567',
  },
  {
    number: 999,
    expected: '999',
  },
  {
    number: -1234,
    expected: '-1,234',
  },
])('.formatNumberToEnglish($number)', ({ number, expected }) => {
  test(`returns ${expected}`, () => {
    expect(formatNumberToEnglish(number)).toBe(expected);
  });
});
