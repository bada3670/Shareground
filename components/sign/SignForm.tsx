// 에러 처리 추가 작업 요구

import { auth } from 'fb';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import style from 'styles/components/SignForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

type SocialProvider = GoogleAuthProvider | GithubAuthProvider;

export default function SignForm() {
  const providerGoogle = new GoogleAuthProvider();
  const providerGitHub = new GithubAuthProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  // 이메일 로그인
  const click$login = async () => {
    setLoading(true);
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alert('이메일과 비밀번호를 입력하셔야 합니다.');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes('user-not-found')) {
          alert('해당 계정이 존재하지 않습니다!');
        }
      }
      setLoading(false);
    }
  };

  // 이메일 회원가입
  const click$signup = async () => {
    setLoading(true);
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alert('이메일과 비밀번호를 입력하셔야 합니다.');
      setLoading(false);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          alert('이미 가입되어 있습니다!');
        }
      }
      setLoading(false);
    }
  };

  // 소셜 로그인
  // signInWithPopup 이후 onAuthChanged가 먼저 일어난다.
  const loginSocial = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const click$google = () => {
    loginSocial(providerGoogle);
  };
  const click$github = () => {
    loginSocial(providerGitHub);
  };

  return (
    <section className={style['not-logged-in']} id="sign-form">
      <label htmlFor="email" className={style['label']}>
        이메일
      </label>
      <input type={'email'} id="email" ref={refEmail} className={style['input']} />
      <label htmlFor="password" className={style['label']}>
        비밀번호
      </label>
      <input
        type={'password'}
        id="password"
        ref={refPassword}
        className={style['input']}
      />
      <div className={style['buttons']}>
        <button
          onClick={click$login}
          disabled={loading}
          className={style['log-in']}
          id="log-in"
        >
          로그인
        </button>
        <button onClick={click$signup} disabled={loading} className={style['sign-up']}>
          회원가입
        </button>
      </div>
      <hr />
      <div className={style['social']}>
        <button disabled={loading} onClick={click$google}>
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button disabled={loading} onClick={click$github}>
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </section>
  );
}
