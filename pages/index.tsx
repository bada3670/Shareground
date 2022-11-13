import Head from 'next/head';
import style from 'styles/Home.module.scss';
import Welcome from 'components/Welcome';
import Intro from 'components/Intro';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shareground-Home</title>
      </Head>
      <main id={style.home}>
        <Welcome />
        <Intro />
      </main>
    </>
  );
}
