import { useState } from 'react';
import AccountName from 'components/AccountName';
import AccountPhoto from 'components/AccountPhoto';
import AccountDelete from './AccountDelete';
import style from 'styles/components/Account.module.scss';

export interface LoadStatus {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className={style['section']}>
      <h1 className={style['title']}>계정</h1>
      <AccountPhoto loadStatus={{ loading, setLoading }} />
      <AccountName loadStatus={{ loading, setLoading }} />
      <AccountDelete loadStatus={{ loading, setLoading }} />
    </section>
  );
}
