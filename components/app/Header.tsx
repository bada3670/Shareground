import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import HeaderCategory from 'components/app/HeaderCategory';
import HeaderSearch from 'components/app/HeaderSearch';
import HeaderAuth from 'components/app/HeaderAuth';
import style from 'styles/components/Header.module.scss';

export default function Header() {
  return (
    <header className={style['header']}>
      <div className={style['logo']} id="header-logo">
        <Link href={'/'}>ShareGround</Link>
      </div>
      <div className={style['empty1']}></div>
      <HeaderCategory />
      <div className={style['empty2']}></div>
      <HeaderSearch />
      <div className={style['create']}>
        <Link href={'/create'}>
          <a id="to-create">
            <FontAwesomeIcon icon={faPen} />
          </a>
        </Link>
      </div>
      <HeaderAuth />
    </header>
  );
}
