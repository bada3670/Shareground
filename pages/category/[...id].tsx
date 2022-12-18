import { DocumentData } from 'firebase/firestore';
import Card from 'components/Card';
import Paginate from 'components/category/Paginate';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';
import getSsrApi from 'utils/getSsrApi';
import style from 'styles/pages/category.module.scss';
import { Context } from 'utils/typeContext';

interface Datum {
  id: string;
  info: DocumentData;
}

export default function ({
  category,
  data,
  pageCount,
  currentPage,
}: {
  category: string;
  data: Datum[] | string;
  pageCount: number | null;
  currentPage: number | null;
}) {
  if (typeof data === 'string' || pageCount === null || currentPage === null) {
    return (
      <section className={style['error']}>
        죄송합니다. 자료를 가져오지 못했습니다.
      </section>
    );
  }

  return (
    <main className={style['main']}>
      <h1 className={style['category']} id="category-page__title">
        {categoryEngToKor(category)}
      </h1>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
      <Paginate category={category} pageCount={pageCount} currentPage={currentPage} />
    </main>
  );
}

// society/1
export async function getServerSideProps(context: Context) {
  const {
    query: { id },
  } = context;
  const resArticles = await fetch(
    `${getSsrApi(context)}/category?category=${id[0]}&page=${id[1]}`
  );
  if (resArticles.status !== 200) {
    return {
      props: {
        category: id[0],
        data: '죄송합니다. 문제가 발생했습니다.',
        pageCount: null,
        currentPage: null,
      },
    };
  }
  const { data, pageCount } = await resArticles.json();
  return {
    props: {
      category: id[0],
      data,
      pageCount,
      currentPage: parseInt(id[1]),
    },
  };
}
