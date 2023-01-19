import { useSelector } from 'react-redux';
import { AuthState, authStatus } from 'reducers/auth';
import { useState } from 'react';
import Account from 'components/profile/Account';
import Wrote from 'components/profile/Wrote';
import InterestList from 'components/profile/InterestList';
import style from 'styles/pages/profile.module.scss';

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
          id="profile-button__account"
        >
          계정
        </button>
        <button
          onClick={() => setCategory('wrote')}
          className={style[isChosen('wrote')]}
          id="profile-button__wrote"
        >
          작성
        </button>
        <button
          onClick={() => setCategory('interest')}
          className={style[isChosen('interest')]}
          id="profile-button__interest"
        >
          관심
        </button>
      </section>
      {category === 'account' && <Account />}
      {category === 'wrote' && <Wrote />}
      {category === 'interest' && <InterestList />}
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
