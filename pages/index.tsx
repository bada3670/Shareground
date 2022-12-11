import Welcome from 'components/home/Welcome';
import Intro from 'components/home/Intro';
import style from 'styles/pages/index.module.scss';

export default function Home() {
  return (
    <main className={style.home}>
      <Welcome />
      <Intro />
    </main>
  );
}
