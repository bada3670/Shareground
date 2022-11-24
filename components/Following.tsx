import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import style from 'styles/components/Following.module.scss';

export default function Following() {
  const $toTop = useRef<HTMLButtonElement>(null);

  const click$toTop = () => {
    window.scrollTo(0, 0);
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
      if ($toTop.current) {
        $toTop.current.animate(where, how);
      }
    });
  }, []);

  return (
    <button className={style['to-top']} ref={$toTop} onClick={click$toTop}>
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
}
