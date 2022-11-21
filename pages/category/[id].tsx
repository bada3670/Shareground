import fb from 'fb';
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
import { useEffect, useState } from 'react';
import dateNumToStr from 'utils/dateNumToStr';
import Card from 'components/Card';
import style from 'styles/pages/category.module.scss';
import { categoryEngToKor } from 'utils/convertCategoryLanguage';

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

export default function ({ category, data }: { category: string; data: Datum[] }) {
  return (
    <main className={style['main']}>
      <h1 className={style['category']}>{categoryEngToKor(category)}</h1>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
    </main>
  );
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const db = getFirestore(fb);
  const queryMade = query(
    collection(db, 'articles'),
    where('category', '==', context.query.id),
    // orderBy('date', 'desc'),
    limit(2)
  );
  const snapshot = await getDocs(queryMade);
  const data = snapshot.docs.map((result) => ({
    id: result.id,
    info: result.data(),
  }));

  return {
    props: {
      category: context.query.id,
      data,
    },
  };
}
