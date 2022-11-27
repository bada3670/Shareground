import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import searchReducer from 'reducers/search';
import { db } from 'fb';
import { doc, getDoc } from 'firebase/firestore';

export default function Search() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDoc(doc(db, 'search', 'search'));
        if (snapshot.exists()) {
          const { searchList } = snapshot.data();
          dispatch(searchReducer.actions.add({ list: searchList }));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <></>;
}
