import HeaderSearchNarrow from 'components/app/HeaderSearchNarrow';
import HeaderSearchWide from 'components/app/HeaderSearchWide';
import { useSelector } from 'react-redux';
import { SearchState, Item } from 'reducers/search';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import searchFunction from 'utils/search';

export type ChangeSearch = ChangeEventHandler<HTMLInputElement>;
export type ClickResult = MouseEventHandler<HTMLDivElement>;
export type Result = Item[];

export default function HeaderSearh() {
  const allData = useSelector((state: SearchState) => state.search.list);
  const [searchValue, setSearchValue] = useState<string>('');
  const [result, setResult] = useState<Item[]>([]);

  const change$search: ChangeSearch = (e) => {
    const {
      target: { value },
    } = e;
    const searched = searchFunction(allData, value);
    setSearchValue(value);
    setResult(searched);
  };

  const click$result: ClickResult = (e) => {
    setSearchValue('');
    setResult([]);
  };

  return (
    <>
      <HeaderSearchNarrow
        change$search={change$search}
        click$result={click$result}
        result={result}
        searchValue={searchValue}
      />
      <HeaderSearchWide
        change$search={change$search}
        click$result={click$result}
        result={result}
        searchValue={searchValue}
      />
    </>
  );
}
