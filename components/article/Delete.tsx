import { useRouter } from 'next/router';
import style from 'styles/components/Delete.module.scss';

interface Props {
  articleid: string;
  fileRef: string | null;
}

export default function Delete({ articleid, fileRef }: Props) {
  const router = useRouter();

  const click$delete = async () => {
    const answer = confirm('삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    try {
      // storage에 파일이 있다면 삭제
      if (fileRef) {
        const resFile = await fetch(`/api/article-file?file=${fileRef}`, {
          method: 'DELETE',
        });
        if (resFile.status !== 200) {
          throw new Error('죄송합니다. 삭제되지 않았습니다.');
        }
      }
      // 삭제하기
      const resArticle = await fetch(`/api/articles?doc=${articleid}`, {
        method: 'DELETE',
      });
      if (resArticle.status !== 200) {
        throw new Error('죄송합니다. 삭제되지 않았습니다.');
      }
      // 삭제 처리 성공 페이지로 이동
      router.push('/article/deleted');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <button onClick={click$delete} className={style['delete']}>
      삭제
    </button>
  );
}
