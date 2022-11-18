export function categoryToPath(category: string) {
  switch (category) {
    case 'society':
      return 's';
    case 'science':
      return 't';
    case 'culture':
      return 'c';
    default:
      return '';
  }
}
