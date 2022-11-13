import { useRef, useEffect } from 'react';
import style from 'styles/Intro.module.scss';

export default function Intro() {
  const $section = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style['to-original-position']);
          } else {
            entry.target.classList.remove(style['to-original-position']);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if ($section.current) {
      const $children = Array.from($section.current.children);
      $children.forEach(($child) => {
        observer.observe($child);
      });
    }
  }, []);

  return (
    <section id={style.section} ref={$section}>
      <article
        id={style['many-contents']}
        className={`${style['article']} ${style['from-right']}`}
      >
        수많은 콘텐츠를 경험해 보세요!
      </article>
      <article
        id={style['various-forms']}
        className={`${style['article']} ${style['from-left']}`}
      >
        영상, pdf, 이미지 등 다양한 종류의 콘텐츠를 제공합니다!
      </article>
      <article
        id={style['reaction']}
        className={`${style['article']} ${style['from-right']}`}
      >
        댓글을 통해 사람들의 반응을 확인하세요!
      </article>
    </section>
  );
}
