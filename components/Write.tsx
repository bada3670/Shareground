import fb from 'fb';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Write({ userid, mode }: { userid: string; mode: string }) {
  const db = getFirestore(fb);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const submit$write: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(true);
    if (mode === 'create') {
      try {
        const { id } = await addDoc(collection(db, category), {
          userid,
          category,
          date: Date.now(),
          title,
          explanation,
        });
        let categoryParam;
        switch (category) {
          case 'society':
            categoryParam = 's';
            break;
          case 'science':
            categoryParam = 't';
            break;
          case 'culture':
            categoryParam = 'c';
            break;
          default:
            break;
        }
        router.push(`/article/${categoryParam}/${id}`);
      } catch (error) {
        console.error(error);
        alert('죄송합니다. 처리가 되지 않았습니다!');
        location.reload();
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
