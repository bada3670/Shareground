import style from 'styles/Header.module.scss';
import { useSelector } from 'react-redux';
import fb from 'fb';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import authReducer from 'reducers/auth';
import Link from 'next/link';

interface State {
  auth: {
    name: string;
    photo: string;
  };
}

export default function Header() {
  const auth = getAuth(fb);
  const { name: username, photo: userphoto } = useSelector((state: State) => state.auth);
  const dispatch = useDispatch();

  const click$logout = async () => {
    await signOut(auth);
    dispatch(authReducer.actions.changeName({ name: null }));
    dispatch(authReducer.actions.changePhoto({ photo: null }));
  };

  return (
    <header id={style['header']}>
      <div id={style['category-narrow']}>
        <div className={style['button']}>☰</div>
      </div>
      <div id={style['logo']}>Shareground</div>
      <div id={style['category-wide']}>
        <div className={style['item']}>사회</div>
        <div className={style['item']}>과학기술</div>
        <div className={style['item']}>문화</div>
      </div>
      <div id={style['empty']}></div>
      <input
        type={'text'}
        id={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
      />
      {username ? (
        <div id={style['logged-in']}>
          <img src={userphoto} alt={'프로필 사진'} id={style['profile']} />
          <div id={style['logout-button']} onClick={click$logout}>
            로그아웃
          </div>
        </div>
      ) : (
        <div id={style['not-logged-in']}>
          <div id={style['login-button']}>
            <Link href={'/sign'}>로그인</Link>
          </div>
        </div>
      )}
    </header>
  );
}
