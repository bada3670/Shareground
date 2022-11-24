import { useSelector } from 'react-redux';
import { auth } from 'fb';
import { signOut } from 'firebase/auth';
import { AuthState, authStatus } from 'reducers/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from 'styles/components/Header.module.scss';

export default function HeaderAuth() {
  const { status: currentAuthStatus, photo } = useSelector(
    (state: AuthState) => state.auth
  );
  const userphoto = photo ?? '';
  const router = useRouter();

  const click$logout = async () => {
    // 이거 먼저 나와도 된다.
    // 이거 먼저 나오지 않으면 signOut이 될 동안 홈페이지로 가지 못한다.
    router.push('/');
    await signOut(auth);
  };

  if (currentAuthStatus === authStatus.loading) {
    return <div>로딩 중</div>;
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <div className={style['not-logged-in']}>
        <div className={style['login-button']}>
          <Link href={'/sign'}>로그인</Link>
        </div>
      </div>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return (
      <div className={style['logged-in']}>
        <Link href={'/profile'}>
          <img
            src={userphoto}
            alt={'프로필 사진'}
            className={style['profile']}
            referrerPolicy={'no-referrer'}
          />
        </Link>
        <div className={style['logout-button']} onClick={click$logout}>
          로그아웃
        </div>
      </div>
    );
  }

  return <></>;
}
