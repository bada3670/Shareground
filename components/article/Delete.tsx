import { storage } from 'fb';
import { useRouter } from 'next/router';
import { ref, deleteObject } from 'firebase/storage';
import { Firestore, doc, deleteDoc } from 'firebase/firestore';
import style from 'styles/components/Delete.module.scss';

interface Props {
  articleid: string;
  db: Firestore;
  fileRef: string;
}

export default function Delete({ articleid, db, fileRef }: Props) {
  const router = useRouter();

  const click$delete = async () => {
    const answer = confirm('삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    try {
      // storage에서 사진 삭제
      // 없어서 삭제를 못하는 경우가 있다.
      // 그런데 원래대로 하면 아래의 error처리에 걸린다.
      // 따라서 별도로 try catch를 만들어야 한다.
      try {
        await deleteObject(ref(storage, `article-file/${fileRef}`));
      } catch (error) {
        console.error(error);
      }
      // 삭제하기
      await deleteDoc(doc(db, 'articles', articleid));
      // 삭제 처리 성공 페이지로 이동
      router.push('/article/deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={click$delete} className={style['delete']}>
      삭제
    </button>
  );
}
