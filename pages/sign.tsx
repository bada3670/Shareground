import { useSelector } from 'react-redux';
import { AuthState } from 'reducers/auth';
import style from 'styles/pages/sign.module.scss';
import SignForm from 'components/SignForm';

export default function sign() {
  const userid = useSelector((state: AuthState) => state.auth.id);

  return (
    <main className={style['main']}>
      {userid ? (
        <section className={style['logged-in']}>이미 로그인을 하셨습니다.</section>
      ) : (
        <SignForm />
      )}
    </main>
  );
}
