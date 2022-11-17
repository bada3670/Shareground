export default function dateNumToStr(numDate: number) {
  const standard = new Date(numDate);
  const year = standard.getFullYear();
  const month = standard.getMonth(); // 0부터 시작
  const date = standard.getDate();

  return `${year}년 ${month + 1}월 ${date}일`;
}
