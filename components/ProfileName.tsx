import fb from 'fb';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import { useRef, useState } from 'react';
import style from 'styles/components/ProfileName.module.scss';

export default function Profile() {
  const db = getFirestore(fb);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { name, id: userid } = useSelector((state: AuthState) => state.auth);
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
    if (!userid) {
      return;
    }
    await updateDoc(doc(db, 'users', userid), {
      name: $inputName.value,
    });
    dispatch(authReducer.actions.changeName({ name: $inputName.value }));
    location.reload();
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
