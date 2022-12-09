import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import searchReducer from 'reducers/search';

export default function Search() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/search');
      if (response.status === 200) {
        const { searchList } = await response.json();
        dispatch(searchReducer.actions.add({ list: searchList }));
      }
    })();
  }, []);

  return <></>;
}
