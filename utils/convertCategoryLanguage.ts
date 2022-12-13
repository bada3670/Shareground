export function categoryEngToKor(value: string): string {
  switch (value) {
    case 'society':
      return '사회';
    case 'science':
      return '과학기술';
    case 'culture':
      return '문화';
    default:
      return '';
  }
}
