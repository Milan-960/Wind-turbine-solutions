/**
 * Converts a Unix timestamp to a formatted local date/time string using the provided timezone.
 * @param unixTimestamp - The Unix timestamp to convert (in seconds) (eg. 1731806446, 1731846410).
 * @param timezone - The IANA timezone string (e.g., "Asia/Kolkata").
 * @param options - Formatting options:
 *                  includeTime: If true, includes the time in the output.
 *                  includeDate: If true, includes the date in the output.
 *                  timeOnly: If true, only outputs the time (overrides other options).
 * @returns A formatted string (e.g., "11/20/2024, 06:30 AM" or "06:30 AM").
 */

export function convertUnixTimeToLocalTime(
  unixTimestamp: number,
  timezone: string,
  options: {
    includeDate?: boolean;
    includeTime?: boolean;
    timeOnly?: boolean;
  } = {
    includeDate: true,
    includeTime: true,
  }
): string {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);

  const formatterOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
  };

  if (options.timeOnly) {
    formatterOptions.hour = '2-digit';
    formatterOptions.minute = '2-digit';
    formatterOptions.hour12 = true;
  } else {
    if (options.includeDate) {
      formatterOptions.year = 'numeric';
      formatterOptions.month = '2-digit';
      formatterOptions.day = '2-digit';
    }
    if (options.includeTime) {
      formatterOptions.hour = '2-digit';
      formatterOptions.minute = '2-digit';
      formatterOptions.hour12 = true;
    }
  }

  return new Intl.DateTimeFormat('en-US', formatterOptions).format(date);
}
