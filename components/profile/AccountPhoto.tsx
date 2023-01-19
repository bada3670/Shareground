import { useDispatch, useSelector } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import { ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import style from 'styles/components/AccountPhoto.module.scss';
import { LoadStatus } from 'components/profile/Account';

export default function AccountPhoto({ loadStatus }: { loadStatus: LoadStatus }) {
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
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bufferArray = new Uint8Array(buffer);
    const response = await fetch(`/api/user?user=${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: null, photo: Array.from(bufferArray) }),
    });
    if (response.status !== 200) {
      alert('죄송합니다. 수정이 되지 않았습니다.');
    } else {
      const { url } = await response.json();
      dispatch(authReducer.actions.changePhoto({ photo: url }));
    }
    setLoading(false);
  };

  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <section className={style['section']}>
      <div className={style['container']}>
        <img src={userphoto} className={style['img']} />
        <button className={style['edit']} disabled={loading} onClick={click$changePhoto}>
          <FontAwesomeIcon icon={faUpload} />
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
