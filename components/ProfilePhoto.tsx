import fb from 'fb';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import { ChangeEvent, useRef, useState } from 'react';
import style from 'styles/components/ProfilePhoto.module.scss';

export default function ProfilePhoto() {
  const db = getFirestore(fb);
  const storage = getStorage(fb);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id: userid, photo } = useSelector((state: AuthState) => state.auth);
  const userphoto = photo ? photo : '';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (!e.target.files || !userid) {
      return;
    }
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `profile/${userid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', userid), {
        photo: url,
      });
      dispatch(authReducer.actions.changePhoto({ photo: url }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
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
