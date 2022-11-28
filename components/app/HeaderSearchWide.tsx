import { ChangeEventHandler, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { SearchState, Item } from 'reducers/search';
import searchFunction from 'utils/search';
import style from 'styles/components/HeaderSearchWide.module.scss';

export default function HeaderSearchWide() {
  const allData = useSelector((state: SearchState) => state.search.list);
  const [result, setResult] = useState<Item[]>([]);

  const change$search: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    const searched = searchFunction(allData, value);
    setResult(searched);
  };

  return (
    <div className={style['container']}>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
        onChange={change$search}
      />
      <div className={style['result']}>
        {result.map(({ title, id }, index) => (
          <div key={index}>
            <Link href={`/article/${id}`}>{title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
