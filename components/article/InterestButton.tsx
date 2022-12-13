import { useEffect, useState } from 'react';
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
    const resInterest = await fetch(`/api/interest`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleid, newInterestPeople }),
    });
    if (resInterest.status !== 204) {
      alert(message);
      return;
    }
    setStar(starType);
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
      <button
        onClick={click$button}
        disabled={loading}
        className={style['button']}
        id="article__interest-button"
      >
        <FontAwesomeIcon icon={star} />
      </button>
    </section>
  );
}
