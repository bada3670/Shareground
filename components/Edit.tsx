import fb from 'fb';
import { getFirestore, updateDoc, doc, DocumentData } from 'firebase/firestore';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import style from 'styles/components/Write.module.scss';

interface Props {
  data: DocumentData;
  articleid: string;
}

export default function Edit({ data, articleid }: Props) {
  const db = getFirestore(fb);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { category, title, explanation } = data;
  const refSubmit = useRef<HTMLInputElement>(null);

  const click$cancel = () => {
    router.push(`/article/${articleid}`);
  };
  const click$submit = () => {
    refSubmit.current?.click();
  };

  const submit$edit: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(false);
    await updateDoc(doc(db, 'articles', articleid), {
      category,
      title,
      explanation,
    });
    router.push(`/article/${articleid}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$edit)} className={style['form']}>
        <section className={style['select']}>
          <label htmlFor="category">카테고리</label>
          <select id="category" {...register('category')} defaultValue={category}>
            <option value="society">사회</option>
            <option value="science">과학•기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          defaultValue={title}
          className={style['title']}
        />
        <textarea
          {...register('explanation')}
          defaultValue={explanation}
          className={style['explanation']}
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['buttons']}>
        <button onClick={click$cancel} disabled={loading}>
          취소
        </button>
        <button onClick={click$submit} disabled={loading}>
          수정
        </button>
      </section>
    </>
  );
}
