import { getAuth, updateProfile } from 'firebase/auth';
import fb from 'fb';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from 'reducers/auth';
import { useRef, useState } from 'react';
import style from 'styles/ProfileName.module.scss';

interface State {
  auth: {
    id: string | null;
    name: string | null;
    photo: string | null;
  };
}

export default function Profile() {
  const auth = getAuth(fb);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { name } = useSelector((state: State) => state.auth);
  const username = name ? name : '';
  const refNameSection = useRef<HTMLElement>(null);
  const refInputName = useRef<HTMLInputElement>(null);

  const click$edit = () => {
    refNameSection.current?.classList.add(style['edit-mode']);
  };
  const click$cancel = () => {
    const $inputName = refInputName.current;
    const $nameSection = refNameSection.current;
    if (!$inputName || !$nameSection) {
      return;
    }
    $inputName.value = username;
    $nameSection.classList.remove(style['edit-mode']);
  };
  const click$confirm = async () => {
    setIsLoading(true);
    const $inputName = refInputName.current;
    if (!$inputName) {
      return;
    }
    if ($inputName.value.length === 0) {
      alert('이름은 한 글자 이상이어야 합니다.');
      return;
    }
    setTimeout(async () => {
      if (!auth.currentUser) {
        return;
      }
      await updateProfile(auth.currentUser, {
        displayName: $inputName ? $inputName.value : null,
      });
      location.reload();
    }, 1000);
    dispatch(authReducer.actions.changeName({ name: $inputName.value }));
  };

  return (
    <section className={style.section} ref={refNameSection}>
      <div className={style.text}>{username}</div>
      <button className={style.edit} onClick={click$edit}>
        수정
      </button>
      <input
        type={'text'}
        className={style.input}
        ref={refInputName}
        defaultValue={username}
      />
      <button className={style.cancel} onClick={click$cancel} disabled={isLoading}>
        취소
      </button>
      <button className={style.confirm} onClick={click$confirm} disabled={isLoading}>
        확인
      </button>
    </section>
  );
}
