import { useRouter } from 'next/router';
import style from 'styles/components/ToEdit.module.scss';

export default function ToEdit({ articleid }: { articleid: string }) {
  const router = useRouter();

  const click$edit = () => {
    router.push(`/edit/${articleid}`);
  };

  return (
    <button onClick={click$edit} className={style['to-edit']} id="article__to-edit">
      수정
    </button>
  );
}
