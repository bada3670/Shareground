import Link from 'next/link';
import HeaderCategory from 'components/app/HeaderCategory';
import HeaderSearh from 'components/app/HeaderSearh';
import HeaderAuth from 'components/app/HeaderAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import style from 'styles/components/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['logo']}>
        <Link href={'/'}>Shareground</Link>
      </div>
      <div className={style['empty1']}></div>
      <HeaderCategory />
      <div className={style['empty2']}></div>
      <HeaderSearh />
      <div className={style['create']}>
        <Link href={'/create'}>
          <a>
            <FontAwesomeIcon icon={faPen} />
          </a>
        </Link>
      </div>
      <HeaderAuth />
    </header>
  );
}
