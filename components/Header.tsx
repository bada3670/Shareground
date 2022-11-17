import { useDispatch, useSelector } from 'react-redux';
import fb from 'fb';
import { getAuth, signOut } from 'firebase/auth';
import authReducer, { AuthState } from 'reducers/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from 'styles/components/Header.module.scss';

export default function Header() {
  const auth = getAuth(fb);
  const { id: userid, photo } = useSelector((state: AuthState) => state.auth);
  const userphoto = photo ?? '';
  const dispatch = useDispatch();
  const router = useRouter();

  const click$logout = async () => {
    await signOut(auth);
    dispatch(authReducer.actions.changeAll({ id: null, name: null, photo: null }));
    router.push('/');
  };

  return (
    <header className={style['header']}>
      <div className={style['category-narrow']}>
        <div className={style['button']}>☰</div>
      </div>
      <div className={style['logo']}>
        <Link href={'/'}>Shareground</Link>
      </div>
      <div className={style['category-wide']}>
        <div className={style['item']}>사회</div>
        <div className={style['item']}>과학•기술</div>
        <div className={style['item']}>문화</div>
      </div>
      <div className={style['empty']}></div>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
      />
      {userid ? (
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
      ) : (
        <div className={style['not-logged-in']}>
          <div className={style['login-button']}>
            <Link href={'/sign'}>로그인</Link>
          </div>
        </div>
      )}
    </header>
  );
}
