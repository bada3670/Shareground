import { auth, db } from 'fb';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authReducer from 'reducers/auth';

export default function Auth() {
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
          })
        );
        return;
      }

      // 사용자가 있는 경우
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        // 로그인
        const { name, photo } = snap.data();
        dispatch(
          authReducer.actions.changeAll({
            status: 'fetched',
            id: user.uid,
            name,
            photo,
          })
        );
      } else {
        // 회원 가입
        const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
        const { uid, displayName, email, photoURL } = user;
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        await setDoc(doc(db, 'users', uid), {
          name,
          photo,
        });
        dispatch(
          authReducer.actions.changeAll({
            status: 'fetched',
            id: uid,
            name,
            photo,
          })
        );
      }
    });
  }, []);

  return <></>;
}
