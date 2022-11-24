import { useSelector } from 'react-redux';
import { AuthState, authStatus } from 'reducers/auth';
import style from 'styles/pages/sign.module.scss';
import SignForm from 'components/sign/SignForm';

export default function sign() {
  const currentAuthStatus = useSelector((state: AuthState) => state.auth.status);

  if (currentAuthStatus === authStatus.loading) {
    return (
      <main className={style['main']}>
        <section className={style['logged-in']}>로딩 중</section>
      </main>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return (
      <main className={style['main']}>
        <section className={style['logged-in']}>이미 로그인을 하셨습니다.</section>
      </main>
    );
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <main className={style['main']}>
        <SignForm />
      </main>
    );
  }

  return <main className={style['main']}></main>;
}
