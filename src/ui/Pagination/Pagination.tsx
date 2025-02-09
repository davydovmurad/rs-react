import { PAGINATION_LIMIT } from '../../consts';
import styles from './Pagination.module.css';
import { Link } from 'react-router';

type PaginationProps = {
  total: number;
  page: number;
};

export default function Pagination({ total, page }: PaginationProps) {
  const pagesCount: number = Math.ceil(total / PAGINATION_LIMIT);
  let numLinkList: number[];

  if (page === 1) {
    numLinkList = [1, 2, 3];
  } else if (page === pagesCount) {
    numLinkList = [page - 2, page - 1, page];
  } else {
    numLinkList = [page - 1, page, page + 1];
  }

  return (
    <>
      <div className={styles.paginationContainer}>
        <ul className={styles.pagination}>
          <li
            className={
              page === 1
                ? [styles.prev, styles.disabled].join(' ')
                : styles.prev
            }
          >
            <Link to="/?page=1" className={styles.link}>
              ←
            </Link>
          </li>

          {numLinkList.map((num) => (
            <li key={num} className={num === page ? styles.active : ''}>
              <Link to={`/?page=${num}`} className={styles.link}>
                {num}
              </Link>
            </li>
          ))}

          <li
            className={
              page === pagesCount
                ? [styles.next, styles.disabled].join(' ')
                : styles.next
            }
          >
            <Link to={`/?page=${pagesCount}`} className={styles.link}>
              →
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
