import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import dateNumToStr from 'utils/dateNumToStr';
import style from 'styles/components/Card.module.scss';
import { useRouter } from 'next/router';

interface Datum {
  id: string;
  info: DocumentData;
}

export default function Card({ datum }: { datum: Datum }) {
  const { fileType, title, category, username, date } = datum.info;
  const router = useRouter();

  let borderColor = 'black';

  switch (fileType) {
    case 'png':
      borderColor = 'red';
      break;

    default:
      break;
  }

  const click$article = () => {
    router.push(`/article/${datum.id}`);
  };

  return (
    <article
      className={`${style['card']} card-${style[borderColor]}`}
      onClick={click$article}
    >
      <div className={style['file-type']}>{fileType ?? '파일 없음'}</div>
      <div className={style['title']}>{title}</div>
      <div className={style['others']}>
        {category}, {username}, {dateNumToStr(date)}
      </div>
    </article>
  );
}
