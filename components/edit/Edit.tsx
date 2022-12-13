import { DocumentData } from 'firebase/firestore';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import style from 'styles/components/Write.module.scss';

interface Props {
  data: DocumentData;
  articleid: string;
}

export default function Edit({ data, articleid }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { category, title, explanation, fileRef: prevFileRef } = data;
  const [fileName, setFileName] = useState<string>('파일을 새로 올리셔야 합니다.');
  const refFile = useRef<HTMLInputElement>(null);
  const refSubmit = useRef<HTMLInputElement>(null);

  const click$cancel = () => {
    router.push(`/article/${articleid}`);
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

  const submit$edit: SubmitHandler<FieldValues> = async ({
    category,
    title,
    explanation,
  }) => {
    setLoading(true);

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
    const response = await fetch(`/api/articles?ar=${articleid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prevFileRef,
        fileType,
        fileBuffer,
        category,
        title,
        explanation,
      }),
    });
    if (response.status !== 204) {
      alert('죄송합니다. 수정되지 않았습니다.');
      setLoading(false);
      return;
    }
    router.push(`/article/${articleid}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit$edit)} className={style['form']}>
        <section className={style['select']}>
          <label htmlFor="edit__category">카테고리</label>
          <select {...register('category')} defaultValue={category} id="edit__category">
            <option value="society">사회</option>
            <option value="science">과학기술</option>
            <option value="culture">문화</option>
          </select>
        </section>
        <input
          type={'text'}
          {...register('title')}
          defaultValue={title}
          className={style['title']}
          id="edit__title"
        />
        <textarea
          {...register('explanation')}
          defaultValue={explanation}
          className={style['explanation']}
          id="edit__explanation"
        ></textarea>
        <input type={'submit'} hidden ref={refSubmit} />
      </form>
      <section className={style['file']}>
        <input
          type={'file'}
          hidden
          onChange={change$file}
          ref={refFile}
          id="edit__file"
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
        <button onClick={click$submit} disabled={loading} id="edit__submit">
          수정
        </button>
      </section>
    </>
  );
}
