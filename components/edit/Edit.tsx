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
    let fileRef = null;
    let fileURL = null;

    try {
      ////////////파일 수정하기////////////////
      if (prevFileRef) {
        // 기존에 파일이 있으면 삭제
        const resFile = await fetch(`/api/article-file?file=${prevFileRef}`, {
          method: 'DELETE',
        });
        if (resFile.status !== 200) {
          throw new Error('죄송합니다. 수정되지 않았습니다.');
        }
      }
      if (refFile.current?.files) {
        if (refFile.current.files[0]) {
          // 새 파일을 올리기
          fileType = refFile.current?.files[0].name.split('.').at(-1);
          const buffer = await refFile.current.files[0].arrayBuffer();
          const bufferArray = new Uint8Array(buffer);
          const resFile = await fetch(`/api/article-file`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileType, buffer: Array.from(bufferArray) }),
          });
          if (resFile.status !== 201) {
            throw new Error('죄송합니다. 수정되지 않았습니다.');
          }
          const dataFile = await resFile.json();
          fileRef = dataFile.fileRef;
          fileURL = dataFile.fileURL;
        }
      }
      ////////////////article 수정하기///////////////
      const payArticle = { category, title, explanation, fileType, fileRef, fileURL };
      const resArticle = await fetch(`/api/articles?doc=${articleid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payArticle),
      });
      if (resArticle.status !== 204) {
        throw new Error('죄송합니다. 수정되지 않았습니다.');
      }
      ///////////////이동하기////////////////
      router.push(`/article/${articleid}`);
    } catch (error) {
      ///////////////에러/////////////////
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
      setLoading(false);
    }
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
      <section className={style['file']}>
        <input type={'file'} hidden onChange={change$file} ref={refFile} />
        <button onClick={click$file} disabled={loading}>
          파일 업로드
        </button>
        <div>업로드된 파일: {fileName}</div>
      </section>
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
