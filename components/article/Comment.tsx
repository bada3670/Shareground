import { useEffect, useState } from 'react';
import dateNumtoStr from 'utils/dateNumToStr';
import style from 'styles/components/Comment.module.scss';

interface Props {
  content: string;
  writerid: string;
  date: number;
  articleid: string;
  currentUserid: string | null;
  id: string;
}

interface Writer {
  writername: string;
  writerphoto: string;
}

export default function Comment({
  id,
  content,
  writerid,
  date,
  articleid,
  currentUserid,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [writerData, setWriterData] = useState<Writer | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/user?user=${writerid}`);
      if (response.status !== 200) {
        setWriterData(null);
        return;
      }
      const { name: writername, photo: writerphoto } = await response.json();
      setWriterData({ writername, writerphoto });
    })();
  }, []);

  const click$delete = async () => {
    setLoading(true);
    const answer = confirm('해당 댓글을 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    const response = await fetch(`/api/comment?article=${articleid}&comment=${id}`, {
      method: 'DELETE',
    });
    if (response.status !== 204) {
      alert('삭제가 되지 않았습니다!');
      setLoading(false);
      return;
    }
    location.reload();
  };

  if (!writerData) {
    return <></>;
  }

  return (
    <article className={style['comment']} id="comment__whole">
      <div className={style['meta']}>
        <div className={style['writer-photo']}>
          <img src={writerData.writerphoto} />
        </div>
        <div className={style['writer-name']} id="comment__writer">
          {writerData.writername}
        </div>
        <div>{dateNumtoStr(date)}</div>
      </div>
      <div id="comment__content">{content}</div>
      {writerid === currentUserid && (
        <div className={style['delete']}>
          <button onClick={click$delete} disabled={loading} id="comment__delete">
            삭제
          </button>
        </div>
      )}
    </article>
  );
}
