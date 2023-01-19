import { useDispatch, useSelector } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import { useRef } from 'react';
import style from 'styles/components/AccountName.module.scss';
import { LoadStatus } from 'components/profile/Account';

export default function AccountName({ loadStatus }: { loadStatus: LoadStatus }) {
  const { loading, setLoading } = loadStatus;
  const dispatch = useDispatch();
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
    setLoading(true);
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
    const response = await fetch(`/api/user?user=${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: $inputName.value, photo: null }),
    });
    if (response.status !== 204) {
      alert('수정이 되지 않았습니다.');
    } else {
      dispatch(authReducer.actions.changeName({ name: $inputName.value }));
      refNameSection.current?.classList.remove(style['edit-mode']);
    }
    setLoading(false);
  };

  return (
    <section className={style['section']} ref={refNameSection}>
      <div className={style['text']} id="profile-name">
        {username}
      </div>
      <button
        className={`${style['edit']} ${style['button']}`}
        onClick={click$edit}
        disabled={loading}
        id="profile-name__to-edit"
      >
        수정
      </button>
      <input
        type={'text'}
        className={style['input']}
        ref={refInputName}
        defaultValue={username}
        id="profile-name__edit-input"
      />
      <button
        className={`${style['cancel']} ${style['button']}`}
        onClick={click$cancel}
        disabled={loading}
      >
        취소
      </button>
      <button
        className={`${style['confirm']} ${style['button']}`}
        onClick={click$confirm}
        disabled={loading}
        id="profile-name__edit-confirm"
      >
        확인
      </button>
    </section>
  );
}
