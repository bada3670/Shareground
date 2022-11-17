import fb from 'fb';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authReducer from 'reducers/auth';

export default function Auth() {
  const auth = getAuth(fb);
  const db = getFirestore(fb);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { name, photo } = docSnap.data();
        dispatch(authReducer.actions.changeAll({ id: user.uid, name, photo }));
      } else {
        console.log('No such document!');
      }
    });
  }, []);

  return <></>;
}
