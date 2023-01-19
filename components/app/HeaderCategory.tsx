import { KeyboardEventHandler, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faList } from '@fortawesome/free-solid-svg-icons';
import style from 'styles/components/HeaderCategory.module.scss';

function TitleText() {
  return (
    <>
      <span className={style['title-narrow']} id="category-narrow__button">
        <FontAwesomeIcon icon={faList} />
      </span>
      <span className={style['title-wide']}>
        카테고리 <FontAwesomeIcon icon={faAngleDown} />
      </span>
    </>
  );
}

export default function HeaderCategory() {
  const refCategories = useRef<HTMLDivElement>(null);

  const pointerdown$title = () => {
    if (refCategories.current) {
      refCategories.current.classList.toggle(style['visible']);
    }
  };

  const keydown$title: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && refCategories.current) {
      refCategories.current.classList.toggle(style['visible']);
    }
  };

  const mouseenter$title = () => {
    if (refCategories.current) {
      refCategories.current.classList.add(style['visible']);
    }
  };

  const mouseleave$container = () => {
    if (refCategories.current) {
      refCategories.current.classList.remove(style['visible']);
    }
  };

  const click$categories = () => {
    if (refCategories.current) {
      refCategories.current.classList.remove(style['visible']);
    }
  };

  return (
    <div
      className={style['container']}
      onMouseLeave={mouseleave$container}
      id="category-menu"
    >
      <div className={style['title']}>
        <button
          onPointerDown={pointerdown$title}
          onMouseEnter={mouseenter$title}
          onKeyDown={keydown$title}
          id="category-menu__button"
        >
          <TitleText />
        </button>
      </div>
      <div
        className={style['categories']}
        ref={refCategories}
        onClick={click$categories}
        id="category-menu__result"
      >
        <div>
          <Link href={'/category/society/1'}>사회</Link>
        </div>
        <div>
          <Link href={'/category/science/1'}>과학기술</Link>
        </div>
        <div>
          <Link href={'/category/culture/1'}>문화</Link>
        </div>
      </div>
    </div>
  );
}
