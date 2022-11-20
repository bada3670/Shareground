import fb from 'fb';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';
import style from 'styles/components/Write.module.scss';

export default function Write({ userid }: { userid: string }) {
  const db = getFirestore(fb);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { wrote } = useSelector((state: AuthState) => state.auth);
  const { register, handleSubmit } = useForm();
  const refSubmit = useRef<HTMLInputElement>(null);

  const click$cancel = () => {
    router.push('/');
  };
  const click$submit = () => {
    refSubmit.current?.click();
  };

  const submit$form: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(true);
    if (category === '') {
      alert('카테고리를 선택하셔야 합니다!');
      return;
    }
    try {
      // article에 추가하기
      const { id } = await addDoc(collection(db, 'articles'), {
        userid,
        category,
        date: Date.now(),
        title,
        explanation,
      });
      // 사용자에 추가하기
      const newWrote = [...wrote, id];
      await updateDoc(doc(db, 'users', userid), {
        wrote: newWrote,
      });
      dispatch(authReducer.actions.changeWrote({ wrote: newWrote }));
      // 이동하기
      router.push(`/article/${id}`);
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 처리가 되지 않았습니다!');
      // location.reload();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$form)} className={style['form']}>
        <section className={style['select']}>
          <label htmlFor="category">카테고리:</label>
          <select id="category" {...register('category')}>
            <option value="">선택하세요.</option>
            <option value="society">사회</option>
            <option value="science">과학•기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          placeholder={'제목을 입력하세요.'}
          className={style['title']}
        />
        <textarea
          {...register('explanation')}
          placeholder={'설명을 입력하세요.'}
          className={style['explanation']}
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['buttons']}>
        <button onClick={click$cancel} disabled={loading}>
          취소
        </button>
        <button onClick={click$submit} disabled={loading}>
          제출
        </button>
      </section>
    </>
  );
}
