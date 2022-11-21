import { useSelector } from 'react-redux';
import { AuthState, authStatus } from 'reducers/auth';
import Create from 'components/Create';
import style from 'styles/pages/create.module.scss';

export default function profile() {
  const { id, status: currentAuthStatus } = useSelector((state: AuthState) => state.auth);
  const userid = id ?? '';

  if (currentAuthStatus === authStatus.loading) {
    return <main className={style['not-confirmed']}>로딩 중</main>;
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <main className={style['not-confirmed']}>
        로그인을 하셔서 원하는 글을 작성해 보세요!
      </main>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return (
      <main className={style['confirmed']}>
        <Create userid={userid} />
      </main>
    );
  }

  return <></>;
}
