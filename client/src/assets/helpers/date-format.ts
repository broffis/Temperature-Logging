export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short'})
  const year = date.toLocaleString('default', { year: 'numeric'})
  const hour = date.toLocaleString('default', { hour: 'numeric'})
  const day = date.toLocaleString('default', {day: 'numeric'})
  return `${month} ${day}, ${year} @ ${hour}`
}