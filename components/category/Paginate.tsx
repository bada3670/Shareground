import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import style from 'styles/components/Paginate.module.scss';

interface Props {
  category: string;
  pageCount: number;
  currentPage: number;
}
type Click$PageButton = (selectedItem: { selected: number }) => void;

export default function Paginate({ category, pageCount, currentPage }: Props) {
  const router = useRouter();

  const handlePageClick: Click$PageButton = (event) => {
    router.push(`/category/${category}/${event.selected + 1}`);
  };

  return (
    <div className={style['container']} id="category-page__paginate">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        forcePage={currentPage - 1}
        pageCount={pageCount}
        previousLabel="<"
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
