import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import fb from 'fb';
import { useDispatch } from 'react-redux';
import authReducer from 'reducers/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Auth() {
  const auth = getAuth(fb);
  const dispatch = useDispatch();
  const router = useRouter();

  const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        if (!displayName || !photoURL) {
          await updateProfile(user, {
            displayName: name,
            photoURL: photo,
          });
        }
        dispatch(authReducer.actions.changeName({ name }));
        dispatch(authReducer.actions.changePhoto({ photo }));
        router.push('/');
      }
    });
  }, []);

  return <></>;
}
