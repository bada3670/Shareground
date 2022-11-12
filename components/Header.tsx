import { useRef } from 'react';
import style from 'styles/Header.module.scss';

export default function Header() {
  return (
    <header id={style['header']}>
      <div id={style['category-narrow']}>
        <div className={style['button']}>☰</div>
      </div>
      <div id={style['logo']}>Shareground</div>
      <div id={style['category-wide']}>
        <div className={style['item']}>사회</div>
        <div className={style['item']}>과학기술</div>
        <div className={style['item']}>문화</div>
      </div>
      <div id={style['empty']}></div>
      <input
        type={'text'}
        id={style['search']}
        placeholder={'원하시는 콘텐츠의 제목을 입력하세요.'}
      />
      <div id={style['login']}>로그인</div>
    </header>
  );
}
