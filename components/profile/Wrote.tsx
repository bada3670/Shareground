import { DocumentData } from 'firebase/firestore';
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
  let currentNum = numOfUnit;
  const [data, setData] = useState<Datum[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const refLoader = useRef<HTMLDivElement>(null);
  const userid = useSelector((state: AuthState) => state.auth.id);

  const fetchData = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const resArticles = await fetch(`api/wrote?user=${userid}&count=${currentNum}`);
      if (resArticles.status !== 200) {
        alert('문제가 발생했습니다.');
        setIsEnd(true);
      }
      const { articles, totalCount } = await resArticles.json();
      setData(articles);
      if (currentNum >= totalCount) {
        setIsEnd(true);
      } else {
        currentNum += numOfUnit;
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
