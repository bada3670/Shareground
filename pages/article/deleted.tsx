import Link from 'next/link';
import style from 'styles/pages/article_deleted.module.scss';

export default function deleted() {
  return (
    <main className={style['main']} id="article-deletion-page">
      <h2 className={style['message']}>성공적으로 삭제되었습니다!</h2>
      <h2 className={style['to-home']}>
        <Link href={'/'}>홈으로</Link>
      </h2>
    </main>
  );
}
