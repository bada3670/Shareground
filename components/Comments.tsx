import { realdb, db } from 'fb';
import { ref, onValue, remove } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import dateNumtoStr from 'utils/dateNumToStr';
import style from 'styles/components/Comments.module.scss';

interface Prop {
  articleid: string;
  currentUserid: string | null;
}

interface Writer {
  writername: string;
  writerphoto: string;
}

interface Comment {
  id: string;
  content: string;
  writerid: string;
  date: number;
  articleid: string;
  currentUserid: string | null;
}

function Comment({ id, content, writerid, date, articleid, currentUserid }: Comment) {
  const [loading, setLoading] = useState<boolean>(false);
  const [writerData, setWriterData] = useState<Writer | null>(null);

  useEffect(() => {
    (async () => {
      const snapWriter = await getDoc(doc(db, 'users', writerid));
      if (!snapWriter.exists()) {
        setWriterData(null);
      } else {
        const { name: writername, photo: writerphoto } = snapWriter.data();
        setWriterData({ writername, writerphoto });
      }
    })();
  }, []);

  const click$delete = async () => {
    setLoading(true);
    const answer = confirm('해당 댓글을 삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    try {
      await remove(ref(realdb, `comments/${articleid}/${id}`));
    } catch (error) {
      console.error(error);
      alert('삭제가 되지 않았습니다!');
    }
    setLoading(false);
  };

  if (!writerData) {
    return <></>;
  }

  return (
    <article className={style['comment']}>
      <div className={style['meta']}>
        <div className={style['writer-photo']}>
          <img src={writerData.writerphoto} />
        </div>
        <div className={style['writer-name']}>{writerData.writername}</div>
        <div>{dateNumtoStr(date)}</div>
      </div>
      <div>{content}</div>
      {writerid === currentUserid && (
        <div className={style['delete']}>
          <button onClick={click$delete} disabled={loading}>
            삭제
          </button>
        </div>
      )}
    </article>
  );
}

////////////////////////////////////////

export default function Comments({ articleid, currentUserid }: Prop) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    onValue(ref(realdb, `comments/${articleid}`), (snapshot) => {
      if (snapshot.val()) {
        const commentsArray = [];
        for (const key in snapshot.val()) {
          commentsArray.unshift({ id: key, ...snapshot.val()[key] });
        }
        setComments(commentsArray);
      }
    });
  }, []);

  return (
    <section className={style['section']}>
      {comments.map(({ id, content, writerid, date }, index) => (
        <Comment
          id={id}
          content={content}
          writerid={writerid}
          date={date}
          key={index}
          articleid={articleid}
          currentUserid={currentUserid}
        />
      ))}
    </section>
  );
}
