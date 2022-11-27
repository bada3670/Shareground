import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { db } from 'fb';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import style from 'styles/components/CommentForm.module.scss';
import { v4 as uuidv4 } from 'uuid';

export default function CommentForm({
  writerid,
  articleid,
}: {
  writerid: string;
  articleid: string;
}) {
  const { register, handleSubmit, formState, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        comment: '',
      });
    }
  }, [formState]);

  const submit$form: SubmitHandler<FieldValues> = async ({ comment }) => {
    setLoading(true);
    const newComment = { id: uuidv4(), content: comment, writerid, date: Date.now() };
    try {
      const snapshotArticle = await getDoc(doc(db, 'articles', articleid));
      if (snapshotArticle.exists()) {
        const { comments } = snapshotArticle.data();
        comments.unshift(newComment);
        await updateDoc(doc(db, 'articles', articleid), {
          comments,
        });
        location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 등록을 하지 못했습니다.');
      return;
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit$form)} className={style['form']}>
      <input
        type={'text'}
        {...register('comment', { required: true })}
        className={style['content']}
      />
      <input
        type={'submit'}
        disabled={loading}
        className={style['submit']}
        value={'전송'}
      />
    </form>
  );
}
