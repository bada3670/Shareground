import Link from 'next/link';
import HeaderAuth from 'components/HeaderAuth';
import style from 'styles/components/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['category-narrow']}>
        <div className={style['button']}>☰</div>
      </div>
      <div className={style['logo']}>
        <Link href={'/'}>Shareground</Link>
      </div>
      <div className={style['category-wide']}>
        <div className={style['item']}>사회</div>
        <div className={style['item']}>과학•기술</div>
        <div className={style['item']}>문화</div>
      </div>
      <div className={style['empty']}></div>
      <input
        type={'text'}
        className={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
      />
      <div className={style['create']}>
        <Link href={'/create'}>올리기</Link>
      </div>
      <HeaderAuth />
    </header>
  );
}
