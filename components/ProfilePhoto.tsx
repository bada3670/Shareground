import fb from 'fb';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from 'reducers/auth';
import { ChangeEvent, useRef, useState } from 'react';
import style from 'styles/components/ProfilePhoto.module.scss';

interface State {
  auth: {
    id: string | null;
    name: string | null;
    photo: string | null;
  };
}

export default function ProfilePhoto() {
  const auth = getAuth(fb);
  const storage = getStorage(fb);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id: userid, photo } = useSelector((state: State) => state.auth);
  const userphoto = photo ? photo : '';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (!e.target.files || !userid) {
      return;
    }
    const file = e.target.files[0];
    const storageRef = ref(storage, `profile/${userid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setTimeout(async () => {
      if (!auth.currentUser) {
        return;
      }
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      setIsLoading(false);
    }, 1000);
    dispatch(authReducer.actions.changePhoto({ photo: url }));
  };
  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <section className={style.section}>
      <div className={style.container}>
        <img src={userphoto} />
        <button className={style.edit} disabled={isLoading} onClick={click$changePhoto}>
          ✏
        </button>
      </div>
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={refInputPhoto}
        accept="image/jpeg, image/jpg, image/png"
        onChange={change$inputPhoto}
      />
    </section>
  );
}
