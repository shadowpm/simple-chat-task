import { formatTimestamp } from './timestampConvertor';

describe('formatTimestamp function', () => {
  test('formats timestamp into a string with correct date format', () => {
    const timestamp = 1642258245000;
    const formattedString = formatTimestamp(timestamp);

    expect(formattedString).toBe('15 January 2022');
  });

  test('handles timestamp representing date with single-digit day and month', () => {
    const timestamp = 1646451330000;
    const formattedString = formatTimestamp(timestamp);

    expect(formattedString).toBe('5 March 2022');
  });
});
