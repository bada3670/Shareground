import { db, storage } from 'fb';
import { updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import { ChangeEvent, useRef } from 'react';
import style from 'styles/components/AccountPhoto.module.scss';
import { LoadStatus } from 'components/profile/Account';

export default function ProfilePhoto({ loadStatus }: { loadStatus: LoadStatus }) {
  const dispatch = useDispatch();
  const { loading, setLoading } = loadStatus;
  const { id: userid, photo } = useSelector((state: AuthState) => state.auth);
  const userphoto = photo ? photo : '';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <section className={style['section']}>
      <div className={style['container']}>
        <img src={userphoto} className={style['img']} />
        <button className={style['edit']} disabled={loading} onClick={click$changePhoto}>
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
