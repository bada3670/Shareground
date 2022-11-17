import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import Write from 'components/Write';
import style from 'styles/pages/create.module.scss';

export default function profile() {
  const userid = useSelector((state: AuthState) => state.auth.id);

  return (
    <>
      {userid ? (
        <main className={style['logged-in']}>
          <Write userid={userid} mode={'create'} />
        </main>
      ) : (
        <main className={style['not-logged-in']}>
          작성 페이지입니다. 로그인을 하셔야 사용하실 수 있습니다.
        </main>
      )}
    </>
  );
}
