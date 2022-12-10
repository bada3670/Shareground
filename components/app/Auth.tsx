import { auth } from 'fb';
import { onAuthStateChanged } from 'firebase/auth';
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

      const resGet = await fetch(`/api/user?user=${user.uid}`);

      // 로그인
      if (resGet.status === 200) {
        const { name, photo } = await resGet.json();
        dispatch(
          authReducer.actions.changeAll({
            status: 'fetched',
            id: user.uid,
            name,
            photo,
          })
        );
        return;
      }

      // 회원가입
      if (resGet.status === 404) {
        const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
        const { uid, displayName, email, photoURL } = user;
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        const resPost = await fetch(`/api/user?user=${uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, photo }),
        });
        if (resPost.status !== 201) {
          alert('죄송합니다. 회원가입이 되지 않았습니다.');
          return;
        }
        dispatch(
          authReducer.actions.changeAll({
            status: 'fetched',
            id: uid,
            name,
            photo,
          })
        );
        return;
      }

      // 오류 발생
      alert('죄송합니다. 문제가 발생해서 처리되지 않았습니다.');
      return;
    });
  }, []);

  return <></>;
}
