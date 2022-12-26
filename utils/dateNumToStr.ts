export default function dateNumToStr(dateNum: number) {
  const dateObj = new Date(dateNum);
  const dateStr = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(dateObj);
  return dateStr;
}
