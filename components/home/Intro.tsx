import { useRef, useEffect } from 'react';
import style from 'styles/components/Intro.module.scss';

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
    <section className={style.section} ref={$section}>
      <article
        className={`${style['article']} ${style['from-right']} ${style['many-contents']}`}
      >
        <h1>누구나</h1>
        <p>누구나 글을 올리고 읽을 수 있습니다!</p>
      </article>
      <article
        className={`${style['article']} ${style['from-left']} ${style['various-forms']}`}
      >
        <h1>파일</h1>
        <p>문서, 이미지, 오디오, 영상 등 다양한 파일을 올려보세요!</p>
      </article>
      <article
        className={`${style['article']} ${style['from-right']} ${style['reaction']}`}
      >
        <h1>댓글</h1>
        <p>댓글을 통해 다른 사람과 의견을 나눠 보세요!</p>
      </article>
    </section>
  );
}
