import fb from 'fb';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import style from 'styles/pages/sign.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

type SocialProvider = GoogleAuthProvider | GithubAuthProvider;

export default function sign() {
  const auth = getAuth(fb);
  const providerGoogle = new GoogleAuthProvider();
  const providerGitHub = new GithubAuthProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const $email = useRef<HTMLInputElement>(null);
  const $password = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 이메일 로그인
  const click$login = async () => {
    setLoading(true);
    const email = $email.current?.value;
    const password = $password.current?.value;
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    router.push('/');
  };
  const click$signup = async () => {
    setLoading(true);
    const email = $email.current?.value;
    const password = $password.current?.value;
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    router.push('/');
  };

  // 소셜 로그인
  const loginSocial = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    router.push('/');
  };
  const click$google = () => {
    loginSocial(providerGoogle);
  };
  const click$github = () => {
    loginSocial(providerGitHub);
  };

  return (
    <section className={style['section']}>
      <div className={style['container']}>
        <label htmlFor="email" className={style['label']}>
          이메일
        </label>
        <input type={'email'} id="email" ref={$email} className={style['input']} />
        <label htmlFor="password" className={style['label']}>
          비밀번호
        </label>
        <input
          type={'password'}
          id="password"
          ref={$password}
          className={style['input']}
        />
        <button onClick={click$login} disabled={loading} className={style['submit']}>
          로그인
        </button>
        <button onClick={click$signup} disabled={loading} className={style['submit']}>
          회원가입
        </button>
        <hr />
        <div className={style['social']}>
          <button disabled={loading} onClick={click$google}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button disabled={loading} onClick={click$github}>
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
      </div>
    </section>
  );
}
