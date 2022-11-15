import { useEffect, useRef } from 'react';
import style from 'styles/Following.module.scss';
import { useRouter } from 'next/router';

export default function Following() {
  const router = useRouter();
  const $section = useRef<HTMLElement>(null);

  const click$toTop = () => {
    window.scrollTo(0, 0);
  };
  const click$login = () => {
    router.push('/sign');
  };
  const click$toBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

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
    <section className={style.section} ref={$section}>
      <div className={style.item} onClick={click$toTop}>
        맨 위로
      </div>
      <div className={style.item} onClick={click$login}>
        로그인
      </div>
      <div className={style.item} onClick={click$toBottom}>
        맨 아래로
      </div>
    </section>
  );
}
