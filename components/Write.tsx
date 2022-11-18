import fb from 'fb';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { categoryToPath } from 'utils/categoryPath';
import { useSelector, useDispatch } from 'react-redux';
import authReducer, { AuthState } from 'reducers/auth';

export default function Write({ userid, mode }: { userid: string; mode: string }) {
  const db = getFirestore(fb);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { wrote, name, bookmark, id } = useSelector((state: AuthState) => state.auth);
  console.log(wrote, name, bookmark, id);

  const { register, handleSubmit } = useForm();

  const submit$write: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(true);
    if (mode === 'create') {
      try {
        // article에 추가하기
        const { id } = await addDoc(collection(db, category), {
          userid,
          category,
          date: Date.now(),
          title,
          explanation,
        });
        // 사용자에 추가하기
        console.log(wrote);

        const newWrote = [...wrote, id];
        await updateDoc(doc(db, 'users', userid), {
          wrote: newWrote,
        });
        dispatch(authReducer.actions.changeWrote({ wrote: newWrote }));
        // 이동하기
        router.push(`/article/${categoryToPath(category)}/${id}`);
      } catch (error) {
        console.error(error);
        alert('죄송합니다. 처리가 되지 않았습니다!');
        // location.reload();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit$write)}>
      <label htmlFor="category">카테고리</label>
      <select id="category" {...register('category')}>
        <option value="">선택하세요.</option>
        <option value="society">사회</option>
        <option value="science">과학•기술</option>
        <option value="culture">문화</option>
      </select>
      <input type={'text'} {...register('title')} />
      <textarea {...register('explanation')}></textarea>
      <input
        type={'submit'}
        disabled={loading}
        value={mode === 'create' ? '추가' : '수정'}
      />
    </form>
  );
}
