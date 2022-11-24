import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { realdb } from 'fb';
import { ref, child, push, update } from 'firebase/database';
import style from 'styles/components/CommentForm.module.scss';

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
    const newComment = { content: comment, writerid, date: Date.now() };
    const newKey = push(child(ref(realdb), 'comments')).key;
    if (!newKey) {
      alert('죄송합니다. 등록을 하지 못했습니다.');
      return;
    }
    const updates = {
      [`comments/${articleid}/${newKey}`]: newComment,
    };
    try {
      await update(ref(realdb), updates);
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 등록을 하지 못했습니다.');
      return;
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit$form)} className={style['form']}>
      <input type={'text'} {...register('comment')} className={style['content']} />
      <input
        type={'submit'}
        disabled={loading}
        className={style['submit']}
        value={'전송'}
      />
    </form>
  );
}
