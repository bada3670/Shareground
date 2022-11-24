import { useRouter } from 'next/router';
import { Firestore, doc, deleteDoc } from 'firebase/firestore';
import style from 'styles/components/Delete.module.scss';

export default function Delete({ articleid, db }: { articleid: string; db: Firestore }) {
  const router = useRouter();

  const click$delete = async () => {
    const answer = confirm('삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    try {
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
