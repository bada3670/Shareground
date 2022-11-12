import Head from 'next/head';
import style from 'styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shareground-Home</title>
      </Head>
      <div id={style.home}>
        <h1>Shareground</h1>
      </div>
    </>
  );
}
