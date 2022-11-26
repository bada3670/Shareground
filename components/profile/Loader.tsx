import { forwardRef } from 'react';
import style from 'styles/components/Loader.module.scss';

type Refs = HTMLDivElement;
type Props = { isEnd: boolean };

const Loader = forwardRef<Refs, Props>(({ isEnd }, reference) => {
  if (isEnd) {
    return (
      <section className={style['section']}>
        <div className={style['end']}>모든 자료가 왔습니다.</div>
      </section>
    );
  }

  return (
    <section className={style['section']}>
      <div className={style['loader']} ref={reference}>
        <div className={`${style['l']} ${style['l1']}`}></div>
        <div className={`${style['l']} ${style['l2']}`}></div>
        <div className={`${style['l']} ${style['l3']}`}></div>
        <div className={`${style['l']} ${style['l4']}`}></div>
      </div>
    </section>
  );
});

export default Loader;
