import { useSelector } from 'react-redux';
import ProfileName from 'components/ProfileName';
import ProfilePhoto from 'components/ProfilePhoto';
import style from 'styles/pages/profile.module.scss';

interface State {
  auth: {
    id: string | null;
    name: string | null;
    photo: string | null;
  };
}

export default function profile() {
  const { id: userid } = useSelector((state: State) => state.auth);

  return (
    <>
      {userid ? (
        <main className={style['logged-in']}>
          <ProfilePhoto />
          <ProfileName />
        </main>
      ) : (
        <main className={style['not-logged-in']}>
          프로필 페이지입니다. 로그인을 하셔야 사용하실 수 있습니다.
        </main>
      )}
    </>
  );
}
