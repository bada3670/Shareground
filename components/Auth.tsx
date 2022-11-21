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
      // 사용자가 없는 경우
      if (!user) {
        dispatch(
          authReducer.actions.changeAll({
            status: 'failed',
            id: null,
            name: null,
            photo: null,
            wrote: [],
            bookmark: [],
          })
        );
        return;
      }

      // 사용자가 있는 경우
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        // 로그인
        const { name, photo, wrote, bookmark } = snap.data();
        dispatch(
          authReducer.actions.changeAll({
            status: 'fetched',
            id: user.uid,
            name,
            photo,
            wrote,
            bookmark,
          })
        );
      } else {
        // 회원 가입
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
          authReducer.actions.changeAll({
            status: 'fetched',
            id: uid,
            name,
            photo,
            wrote,
            bookmark,
          })
        );
      }
    });
  }, []);

  return <></>;
}
