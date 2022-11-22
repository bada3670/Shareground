import { useSelector } from 'react-redux';
import Account from 'components/Account';
import Wrote from 'components/Wrote';
import style from 'styles/pages/profile.module.scss';
import { AuthState, authStatus } from 'reducers/auth';
import { useRef, useState, MouseEvent } from 'react';

function Exist() {
  const [category, setCategory] = useState<string>('account');

  function isChosen(thisCategory: string) {
    if (thisCategory === category) {
      return 'chosen';
    } else {
      return '';
    }
  }

  return (
    <main className={style['exist']}>
      <section className={style['choose']}>
        <button
          onClick={() => setCategory('account')}
          className={style[isChosen('account')]}
        >
          계정
        </button>
        <button onClick={() => setCategory('wrote')} className={style[isChosen('wrote')]}>
          작성
        </button>
      </section>
      {category === 'account' && <Account />}
      {category === 'wrote' && <Wrote />}
    </main>
  );
}

export default function profile() {
  const currentAuthStatus = useSelector((state: AuthState) => state.auth.status);

  if (currentAuthStatus === authStatus.loading) {
    return <main className={style['not-exist']}>로딩 중</main>;
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <main className={style['not-exist']}>
        프로필 페이지입니다. 로그인을 하셔야 사용하실 수 있습니다.
      </main>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return <Exist />;
  }

  return <></>;
}
