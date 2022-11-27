import Comment from 'components/article/Comment';
import { CommentType } from 'pages/article/[id]';

interface Props {
  articleid: string;
  currentUserid: string | null;
  comments: CommentType[];
}

export default function Comments({ articleid, currentUserid, comments }: Props) {
  return (
    <section>
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
