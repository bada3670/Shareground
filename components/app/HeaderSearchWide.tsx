import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChangeSearch, Result, ClickResult } from 'components/app/HeaderSearch';
import style from 'styles/components/HeaderSearchWide.module.scss';

interface Props {
  change$search: ChangeSearch;
  click$result: ClickResult;
  result: Result;
  searchValue: string;
}

interface ResultCompProps {
  result: Result;
  click$result: ClickResult;
}

function ResultComp({ click$result, result }: ResultCompProps) {
  const refResultContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refResultContainer.current) {
      refResultContainer.current.classList.add(style['visible']);
    }
  }, []);

  return (
    <div
      className={style['result']}
      ref={refResultContainer}
      onClick={click$result}
      id="search-wide-result"
    >
      {result.map(({ title, id }, index) => (
        <div key={index}>
          <Link href={`/article/${id}`}>{title}</Link>
        </div>
      ))}
    </div>
  );
}

export default function HeaderSearchWide({
  result,
  change$search,
  click$result,
  searchValue,
}: Props) {
  return (
    <div className={style['container']}>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
        onChange={change$search}
        value={searchValue}
        id="search-wide-input"
      />
      {searchValue === '' ? (
        <></>
      ) : (
        <ResultComp result={result} click$result={click$result} />
      )}
    </div>
  );
}
