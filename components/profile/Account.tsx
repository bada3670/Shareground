import { useState } from 'react';
import AccountName from 'components/profile/AccountName';
import AccountPhoto from 'components/profile/AccountPhoto';
import AccountDelete from 'components/profile/AccountDelete';
import style from 'styles/components/Account.module.scss';

export interface LoadStatus {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className={style['section']}>
      <AccountPhoto loadStatus={{ loading, setLoading }} />
      <AccountName loadStatus={{ loading, setLoading }} />
      <AccountDelete loadStatus={{ loading, setLoading }} />
    </section>
  );
}
