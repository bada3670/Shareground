import fb from 'fb';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function sign() {
  const auth = getAuth(fb);
  const [loading, setLoading] = useState<boolean>(false);
  const $email = useRef<HTMLInputElement>(null);
  const $password = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
    router.push('/');
  };

  return (
    <section>
      <label htmlFor="email">이메일</label>
      <input type={'email'} id="email" ref={$email} />
      <label htmlFor="password">비밀번호</label>
      <input type={'password'} id="password" ref={$password} />
      <button onClick={click$login} disabled={loading}>
        로그인
      </button>
      <button onClick={click$signup} disabled={loading}>
        회원가입
      </button>
      <hr />
      <button disabled={loading}>Google</button>
      <button disabled={loading}>GitHub</button>
    </section>
  );
}
