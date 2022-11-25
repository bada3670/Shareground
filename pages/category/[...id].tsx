import { db } from 'fb';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore';
import Card from 'components/Card';
import Paginate from 'components/category/Paginate';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import style from 'styles/pages/category.module.scss';

// interface Article {
//   userid: string;
//   category: string;
//   date: number;
//   title: string;
//   explanation: string;
// }

interface Datum {
  id: string;
  info: DocumentData;
}

export default function ({
  category,
  data,
  pageCount,
}: {
  category: string;
  data: Datum[] | string;
  pageCount: number | null;
}) {
  if (typeof data === 'string' || pageCount === null) {
    return (
      <section className={style['error']}>
        죄송합니다. 자료를 가져오지 못했습니다.
      </section>
    );
  }

  return (
    <main className={style['main']}>
      <h1 className={style['category']}>{categoryEngToKor(category)}</h1>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
      <Paginate category={category} pageCount={pageCount} />
    </main>
  );
}

// society/1
export async function getServerSideProps(context: { query: { id: string[] } }) {
  const itemsPerPage = 4;
  const {
    query: { id },
  } = context;

  try {
    // 전체 개수 가져오기
    const countQuery = query(collection(db, 'articles'), where('category', '==', id[0]));
    const countSnapshot = await getCountFromServer(countQuery);
    const pageCount = Math.ceil(countSnapshot.data().count / itemsPerPage);

    // 페이지네이트
    let realQuery;
    if (parseInt(id[1]) === 1) {
      // 첫 페이지인 경우
      realQuery = query(
        collection(db, 'articles'),
        where('category', '==', id[0]),
        orderBy('date', 'desc'),
        limit(itemsPerPage)
      );
    } else {
      // 두 번째 페이지부터
      const offset = itemsPerPage * (parseInt(id[1]) - 1);
      const offsetQuery = query(
        collection(db, 'articles'),
        where('category', '==', id[0]),
        orderBy('date', 'desc'),
        limit(offset)
      );
      const offsetSnapshot = await getDocs(offsetQuery);
      const lastOffset = offsetSnapshot.docs.at(-1);
      realQuery = query(
        collection(db, 'articles'),
        where('category', '==', id[0]),
        orderBy('date', 'desc'),
        startAfter(lastOffset),
        limit(itemsPerPage)
      );
    }
    const realSnapshot = await getDocs(realQuery);
    const data = realSnapshot.docs.map((result) => ({
      id: result.id,
      info: result.data(),
    }));
    return {
      props: {
        category: context.query.id[0],
        data,
        pageCount,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        category: context.query.id[0],
        data: '자료를 찾을 수 없습니다.',
        pageCount: null,
      },
    };
  }
}
