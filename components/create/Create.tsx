import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import searchReducer from 'reducers/search';
import style from 'styles/components/Write.module.scss';

export default function Create({ userid }: { userid: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const refSubmit = useRef<HTMLInputElement>(null);
  const refFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const dispatch = useDispatch();

  const click$cancel = () => {
    router.push('/');
  };
  const click$submit = () => {
    refSubmit.current?.click();
  };
  const click$file = () => {
    refFile.current?.click();
  };
  const change$file = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    // 업로드를 취소한 경우
    if (!event.target.files[0]) {
      setFileName('');
      return;
    }

    setFileName(event.target.files[0].name);
  };

  const submit$form: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(true);

    if (category === '') {
      alert('카테고리를 선택하셔야 합니다!');
      setLoading(false);
      return;
    }
    if (title === '') {
      alert('제목을 입력하셔야 합니다!');
      setLoading(false);
      return;
    }

    let fileType = null;
    let fileBuffer = null;
    if (refFile.current?.files) {
      if (refFile.current.files[0]) {
        fileType = refFile.current?.files[0].name.split('.').at(-1);
        const buffer = await refFile.current.files[0].arrayBuffer();
        const bufferUnit8 = new Uint8Array(buffer);
        fileBuffer = Array.from(bufferUnit8);
      }
    }
    const response = await fetch(`/api/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileType,
        fileBuffer,
        userid,
        category,
        title,
        explanation,
      }),
    });
    if (response.status !== 201) {
      alert('죄송합니다. 저장되지 않았습니다.');
      setLoading(false);
      return;
    }
    const { id, newSearchList } = await response.json();
    dispatch(searchReducer.actions.add({ list: newSearchList }));
    router.push(`/article/${id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$form)} className={style['form']}>
        <section className={style['select']}>
          <label htmlFor="create__category">카테고리:</label>
          <select id="create__category" {...register('category')}>
            <option value="">선택하세요.</option>
            <option value="society">사회</option>
            <option value="science">과학기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          placeholder={'제목을 입력하세요.'}
          className={style['title']}
          id="create__title"
        />
        <textarea
          {...register('explanation')}
          placeholder={'설명을 입력하세요.'}
          className={style['explanation']}
          id="create__explanation"
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['file']}>
        <input
          type={'file'}
          hidden
          onChange={change$file}
          ref={refFile}
          id="create__file"
        />
        <button onClick={click$file} disabled={loading}>
          파일 업로드
        </button>
        <div>업로드된 파일: {fileName}</div>
      </section>
      <section className={style['buttons']}>
        <button onClick={click$cancel} disabled={loading}>
          취소
        </button>
        <button onClick={click$submit} disabled={loading} id="create__submit">
          제출
        </button>
      </section>
    </>
  );
}
