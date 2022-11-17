// 에러 처리 추가 작업 요구

import fb from 'fb';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import authReducer from 'reducers/auth';
import style from 'styles/components/SignForm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

type SocialProvider = GoogleAuthProvider | GithubAuthProvider;

export default function SignForm() {
  const auth = getAuth(fb);
  const db = getFirestore(fb);
  const providerGoogle = new GoogleAuthProvider();
  const providerGitHub = new GithubAuthProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
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
      const { user } = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      if (!user) {
        alert('조회하신 자료로 된 사용자가 없습니다!');
        setLoading(false);
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { name, photo } = docSnap.data();
        dispatch(authReducer.actions.changeAll({ id: user.uid, name, photo }));
        router.push('/');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error(error);
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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      if (!user) {
        setLoading(false);
        return;
      }
      const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
      const { uid, displayName, email, photoURL } = user;
      const name = displayName ? displayName : email?.split('@')[0];
      const photo = photoURL ? photoURL : defaultPhoto;
      await setDoc(doc(db, 'users', uid), {
        name,
        photo,
      });
      dispatch(authReducer.actions.changeAll({ id: uid, name, photo }));
      router.push('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 소셜 로그인
  const loginSocial = async (provider: SocialProvider) => {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (!user) {
        setLoading(false);
        return;
      }
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { name, photo } = docSnap.data();
        dispatch(authReducer.actions.changeAll({ id: user.uid, name, photo }));
        router.push('/');
      } else {
        const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
        const { uid, displayName, email, photoURL } = user;
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        await setDoc(doc(db, 'users', uid), {
          name,
          photo,
        });
        dispatch(authReducer.actions.changeAll({ id: uid, name, photo }));
        router.push('/');
      }
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
    <section className={style['not-logged-in']}>
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
    </section>
  );
}
