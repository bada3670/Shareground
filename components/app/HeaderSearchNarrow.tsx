import Link from 'next/link';
import style from 'styles/components/HeaderSearchNarrow.module.scss';
import { ChangeSearch, Result, ClickResult } from 'components/app/HeaderSearh';
import { useRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Props {
  change$search: ChangeSearch;
  click$result: ClickResult;
  result: Result;
  searchValue: string;
}

type Refs = HTMLDivElement;
interface ResultCompProps {
  result: Result;
  click$result: ClickResult;
  elementSearch: HTMLInputElement | null;
}

const ResultComp = forwardRef<Refs, ResultCompProps>(
  ({ click$result: click$resultFromProp, result, elementSearch }, reference) => {
    const click$result: ClickResult = (e) => {
      click$resultFromProp(e);
      if (elementSearch) {
        elementSearch.classList.remove(style['visible']);
      }
    };

    return (
      <div
        className={`${style['result']} ${style['visible']}`}
        ref={reference}
        onClick={click$result}
      >
        {result.map(({ title, id }, index) => (
          <div key={index}>
            <Link href={`/article/${id}`}>{title}</Link>
          </div>
        ))}
      </div>
    );
  }
);

export default function HeaderSearchNarrow({
  result,
  change$search,
  click$result,
  searchValue,
}: Props) {
  const refSearch = useRef<HTMLInputElement>(null);
  const refResultContainer = useRef<HTMLDivElement>(null);

  const click$button = () => {
    refSearch.current?.classList.toggle(style['visible']);
    refResultContainer.current?.classList.toggle(style['visible']);
  };

  return (
    <div className={style['container']}>
      <button className={style['button']} onClick={click$button}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
        onChange={change$search}
        value={searchValue}
        ref={refSearch}
      />
      {searchValue === '' ? (
        <></>
      ) : (
        <ResultComp
          result={result}
          click$result={click$result}
          ref={refResultContainer}
          elementSearch={refSearch.current}
        />
      )}
    </div>
  );
}
