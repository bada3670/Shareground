import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import Create from 'components/Create';
import style from 'styles/pages/create.module.scss';

export default function profile() {
  const userid = useSelector((state: AuthState) => state.auth.id);

  return (
    <>
      {userid ? (
        <main className={style['confirmed']}>
          <Create userid={userid} />
        </main>
      ) : (
        <main className={style['not-confirmed']}>
          로그인을 하셔서 원하는 글을 작성해 보세요!
        </main>
      )}
    </>
  );
}
