import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
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

  const submit$form: SubmitHandler<FieldValues> = async ({ content }) => {
    setLoading(true);
    if (content === '') {
      alert('글을 입력하셔야 합니다!');
      setLoading(false);
      return;
    }
    const response = await fetch(`/api/comment?article=${articleid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, writerid }),
    });
    if (response.status !== 204) {
      alert('죄송합니다. 등록을 하지 못했습니다.');
      setLoading(false);
      return;
    }
    location.reload();
  };

  return (
    <form onSubmit={handleSubmit(submit$form)} className={style['form']}>
      <input type={'text'} {...register('content')} className={style['content']} />
      <input
        type={'submit'}
        disabled={loading}
        className={style['submit']}
        value={'전송'}
      />
    </form>
  );
}
