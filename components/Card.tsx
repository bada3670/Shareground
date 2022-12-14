import { DocumentData } from 'firebase/firestore';
import dateNumToStr from 'utils/dateNumToStr';
import style from 'styles/components/Card.module.scss';
import { useRouter } from 'next/router';
import { extAud, extDoc, extImg, extVid } from 'utils/fileExtension';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';

interface Datum {
  id: string;
  info: DocumentData;
}

export default function Card({ datum }: { datum: Datum }) {
  const { fileType, title, category, date } = datum.info;
  const router = useRouter();

  let fileTypeForBorder = 'default';

  if (extAud.includes(fileType)) {
    fileTypeForBorder = 'aud';
  }
  if (extDoc.includes(fileType)) {
    fileTypeForBorder = 'doc';
  }
  if (extImg.includes(fileType)) {
    fileTypeForBorder = 'img';
  }
  if (extVid.includes(fileType)) {
    fileTypeForBorder = 'vid';
  }

  const click$article = () => {
    router.push(`/article/${datum.id}`);
  };

  return (
    <article
      className={`${style['card']} ${style[fileTypeForBorder]}`}
      onClick={click$article}
      id="article-card"
    >
      <div className={style['file-type']}>{fileType ?? '파일 없음'}</div>
      <div className={style['title']} id="article-card__title">
        {title}
      </div>
      <div className={style['others']}>
        {categoryEngToKor(category)}, {dateNumToStr(date)}
      </div>
    </article>
  );
}
