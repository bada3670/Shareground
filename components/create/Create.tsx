import { db } from 'fb';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
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

    try {
      // 파일이 있으면 스토리지에 올리기
      let fileType = null;
      let fileRef = null;
      let fileURL = null;
      if (refFile.current?.files) {
        // 아무것도 안 올린 경우 스토리지에 올라가지 않게 하기
        if (refFile.current.files[0]) {
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
            throw new Error('죄송합니다. 저장되지 않았습니다.');
          }
          const dataFile = await resFile.json();
          fileRef = dataFile.fileRef;
          fileURL = dataFile.fileURL;
        }
      }
      // article에 추가하기
      const payArticle = {
        userid,
        category,
        title,
        explanation,
        fileRef,
        fileType,
        fileURL,
      };
      const resArticle = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payArticle),
      });

      if (resArticle.status !== 201) {
        throw new Error('죄송합니다. 저장되지 않았습니다.');
      }

      const { id } = await resArticle.json();

      // search에 추가하기
      const snapshotSearch = await getDoc(doc(db, 'search', 'search'));
      if (snapshotSearch.exists()) {
        const searchListLimit = 500;
        const { searchList } = snapshotSearch.data();
        const searchListLength = searchList.length;
        const searchListMargin = searchListLength + 1 - searchListLimit;
        let newSearchList;
        if (searchListMargin > 0) {
          newSearchList = searchList.slice(searchListMargin);
        } else {
          newSearchList = searchList;
        }
        newSearchList.push({ id, title });
        await updateDoc(doc(db, 'search', 'search'), {
          searchList: newSearchList,
        });
        // redux에 추가하기
        dispatch(searchReducer.actions.add({ list: newSearchList }));
      }

      // 이동하기
      router.push(`/article/${id}`);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
      setLoading(false);
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
          제출
        </button>
      </section>
    </>
  );
}
