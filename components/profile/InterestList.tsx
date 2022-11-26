import { db } from 'fb';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  getCountFromServer,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import Card from 'components/Card';
import Loader from 'components/profile/Loader';
import { useEffect, useState, useRef } from 'react';
import style from 'styles/components/ProfileArticle.module.scss';

interface Datum {
  id: string;
  info: DocumentData;
}

export default function Wrote() {
  const numOfUnit = 4;
  let numOfTotal = numOfUnit;
  const [data, setData] = useState<Datum[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const refLoader = useRef<HTMLDivElement>(null);
  const userid = useSelector((state: AuthState) => state.auth.id);

  const fetchData = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        // 자료 가져와서 화면에 전달
        const queryArticles = query(
          collection(db, 'articles'),
          where('interestPeople', 'array-contains', userid),
          orderBy('date', 'desc'),
          limit(numOfTotal)
        );
        const snapshotArticles = await getDocs(queryArticles);
        const articles = snapshotArticles.docs.map((doc) => ({
          id: doc.id,
          info: doc.data(),
        }));
        setData(articles);

        // article 총 개수 파악하기 -> 로딩 끝낼 때를 파악하기 위해
        const queryCount = query(
          collection(db, 'articles'),
          where('interestPeople', 'array-contains', userid)
        );
        const snapshotCount = await getCountFromServer(queryCount);
        if (numOfTotal >= snapshotCount.data().count) {
          setIsEnd(true);
        } else {
          numOfTotal += numOfUnit;
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(fetchData, {
      threshold: 0,
    });

    if (refLoader.current) {
      observer.observe(refLoader.current);
    }
  }, []);

  return (
    <section className={style['list']}>
      {data.map((datum, index) => {
        return <Card datum={datum} key={index} />;
      })}
      <Loader ref={refLoader} isEnd={isEnd} />
    </section>
  );
}
