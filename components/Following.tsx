import { useEffect, useRef, useState } from 'react';
import style from 'styles/Following.module.scss';

export default function Following() {
  const $section = useRef<HTMLElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const where = [
        // from
        { transform: `translateY(${scrollY}px)` },
        // to
        { transform: `translateY(${scrollY}px)` },
      ];
      const how: KeyframeAnimationOptions = {
        duration: 300,
        iterations: 1,
        delay: 300,
        fill: 'forwards',
        easing: 'ease-in',
      };
      if ($section.current) {
        $section.current.animate(where, how);
      }
    });
  }, []);

  return (
    <section id={style.section} ref={$section}>
      <div className={style.item}>맨 위로</div>
      <div className={style.item}>로그인</div>
      <div className={style.item}>맨 아래로</div>
    </section>
  );
}
