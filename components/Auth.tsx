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
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const { name, photo, wrote, bookmark } = snap.data();
        dispatch(
          authReducer.actions.changeAll({ id: user.uid, name, photo, wrote, bookmark })
        );
      } else {
        const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
        const { uid, displayName, email, photoURL } = user;
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        const wrote: string[] = [];
        const bookmark: string[] = [];
        await setDoc(doc(db, 'users', uid), {
          name,
          photo,
          wrote,
          bookmark,
        });
        dispatch(
          authReducer.actions.changeAll({ id: uid, name, photo, wrote, bookmark })
        );
      }
    });
  }, []);

  return <></>;
}
