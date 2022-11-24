import { db, storage } from 'fb';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import style from 'styles/components/Write.module.scss';

export default function Write({ userid }: { userid: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const refSubmit = useRef<HTMLInputElement>(null);
  const refFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

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
      return;
    }

    try {
      // 파일이 있으면 스토리지에 올리기
      let fileRef = null;
      let fileURL = null;
      let fileType = null;
      if (refFile.current?.files) {
        // 아무것도 안 올린 경우 스토리지에 올라가지 않게 하기
        if (refFile.current.files[0]) {
          fileRef = uuidv4();
          const storageRef = ref(storage, `article-file/${fileRef}`);
          await uploadBytes(storageRef, refFile.current?.files[0]);
          fileURL = await getDownloadURL(storageRef);
          fileType = refFile.current?.files[0].name.split('.').at(-1);
        }
      }
      // article에 추가하기
      const { id } = await addDoc(collection(db, 'articles'), {
        userid,
        category,
        date: Date.now(),
        title,
        explanation,
        fileRef,
        fileURL,
        fileType,
        interestPeople: [],
      });
      // 이동하기
      router.push(`/article/${id}`);
    } catch (error) {
      console.error(error);
      alert('죄송합니다. 처리가 되지 않았습니다.');
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
