import { useEffect, useState } from 'react';
import { db } from 'fb';
import { doc, updateDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import style from 'styles/components/InterestButton.module.scss';

interface Props {
  articleid: string;
  currentUserid: string;
  interestPeople: string[];
}

export default function Interest({ articleid, currentUserid, interestPeople }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [star, setStar] = useState<IconDefinition>(regularStar);

  useEffect(() => {
    if (interestPeople.includes(currentUserid)) {
      setStar(solidStar);
    }
  });

  const changeFirebase = async (
    newInterestPeople: string[],
    message: string,
    starType: IconDefinition
  ) => {
    try {
      await updateDoc(doc(db, 'articles', articleid), {
        interestPeople: newInterestPeople,
      });
      setStar(starType);
    } catch (error) {
      console.error(error);
      alert(message);
    }
  };

  const click$button = async () => {
    setLoading(true);
    if (star === regularStar) {
      const newInterestPeople = [...interestPeople, currentUserid];
      const message = '관심 목록에 추가되지 못했습니다.';
      await changeFirebase(newInterestPeople, message, solidStar);
    } else {
      const newInterestPeople = interestPeople.filter(
        (person) => person !== currentUserid
      );
      const message = '관심 목록에서 제외되지 못했습니다.';
      await changeFirebase(newInterestPeople, message, regularStar);
    }
    setLoading(false);
  };

  return (
    <section className={style['section']}>
      <button onClick={click$button} disabled={loading} className={style['button']}>
        <FontAwesomeIcon icon={star} />
      </button>
    </section>
  );
}
