export function extractString(regex: RegExp, content: string) {
  const match = content.match(regex);
  if (match) {
    return match[1];
  } else {
    return 'N/A';
  }
}

export function formatNumberToEnglish(number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
