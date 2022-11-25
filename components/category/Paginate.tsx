import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import style from 'styles/components/Paginate.module.scss';

interface Props {
  category: string;
  pageCount: number;
}
type Click$PageButton = (selectedItem: { selected: number }) => void;

export default function Paginate({ category, pageCount }: Props) {
  const router = useRouter();

  const handlePageClick: Click$PageButton = (event) => {
    router.push(`/category/${category}/${event.selected + 1}`);
  };

  return (
    <div className={style['container']}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< prev"
        pageClassName={style['page-item']}
        pageLinkClassName={style['page-link']}
        previousClassName={style['page-item']}
        previousLinkClassName={style['page-link']}
        nextClassName={style['page-item']}
        nextLinkClassName={style['page-link']}
        breakLabel="..."
        breakClassName={style['page-item']}
        breakLinkClassName={style['page-link']}
        containerClassName={style['pagination']}
        activeClassName={style['active']}
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}
