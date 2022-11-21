import { useSelector } from 'react-redux';
import ProfileName from 'components/ProfileName';
import ProfilePhoto from 'components/ProfilePhoto';
import style from 'styles/pages/profile.module.scss';
import { AuthState, authStatus } from 'reducers/auth';

export default function profile() {
  const currentAuthStatus = useSelector((state: AuthState) => state.auth.status);

  if (currentAuthStatus === authStatus.loading) {
    return <main className={style['not-logged-in']}>로딩 중</main>;
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <main className={style['not-logged-in']}>
        프로필 페이지입니다. 로그인을 하셔야 사용하실 수 있습니다.
      </main>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return (
      <main className={style['logged-in']}>
        <ProfilePhoto />
        <ProfileName />
      </main>
    );
  }

  return <></>;
}
