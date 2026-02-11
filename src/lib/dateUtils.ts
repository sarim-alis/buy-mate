export function generateDateForProduct(productId: number): Date {
  const seed = productId * 12345;
  const random = Math.abs(Math.sin(seed)) * 10000;
  const daysAgo = Math.floor(random % 180);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
