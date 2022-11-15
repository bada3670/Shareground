import style from 'styles/Welcome.module.scss';

export default function Welcome() {
  return (
    <section className={style.section}>
      <div className={style.carousel}>
        <img src={'/배경.jpg'} className={style.item} />
        <img src={'/배경.jpg'} className={style.item} />
      </div>
      <div className={style.text}>Shareground에 오신 것을 환영합니다!</div>
    </section>
  );
}
