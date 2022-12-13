import { useSelector } from 'react-redux';
import { auth } from 'fb';
import { signOut } from 'firebase/auth';
import { AuthState, authStatus } from 'reducers/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from 'styles/components/HeaderAuth.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

export default function HeaderAuth() {
  const { status: currentAuthStatus, photo } = useSelector(
    (state: AuthState) => state.auth
  );
  const userphoto = photo ?? '';
  const router = useRouter();
  const refLoginContent = useRef<HTMLDivElement>(null);

  const click$logout = async () => {
    // 이거 먼저 나와도 된다.
    // 이거 먼저 나오지 않으면 signOut이 될 동안 홈페이지로 가지 못한다.
    router.push('/');
    await signOut(auth);
  };

  const pointerdown$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.toggle(style['visible']);
    }
  };

  const mouseenter$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.add(style['visible']);
    }
  };

  const mouseleave$container = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove(style['visible']);
    }
  };

  const click$logincontent = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove(style['visible']);
    }
  };

  if (currentAuthStatus === authStatus.loading) {
    return (
      <div className={style['container']}>
        <div className={style['skeleton']}></div>
      </div>
    );
  }

  if (currentAuthStatus === authStatus.failed) {
    return (
      <div className={style['container']} id="to-login">
        <div className={style['icon']}>
          <Link href={'/sign'}>
            <a>
              <FontAwesomeIcon icon={faUser} />
            </a>
          </Link>
        </div>
      </div>
    );
  }

  if (currentAuthStatus === authStatus.fetched) {
    return (
      <div
        className={`${style['container']} ${style['logged-in']}`}
        onMouseLeave={mouseleave$container}
      >
        <button
          className={style['photo']}
          onPointerDown={pointerdown$photo}
          onMouseEnter={mouseenter$photo}
          id="to-profile"
        >
          <img
            src={userphoto}
            alt={'프로필 사진'}
            className={style['profile']}
            referrerPolicy={'no-referrer'}
          />
        </button>
        <div
          className={style['login-content']}
          ref={refLoginContent}
          onClick={click$logincontent}
        >
          <div className={style['logout-button']}>
            <button onClick={click$logout} id="log-out">
              로그아웃
            </button>
          </div>
          <div className={style['to-profile']}>
            <Link href={'/profile'}>
              <a id="to-profile-button">프로필</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
