import { useContext } from 'react';
import { PAGINATION_LIMIT } from '../../consts';
import ThemeContext from '../../context/ThemeContext';
import { Link } from 'react-router';
import styles from './Pagination.module.css';

type PaginationProps = {
  total: number;
  page: number;
};

export default function Pagination({ total, page }: PaginationProps) {
  const theme = useContext(ThemeContext);
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
    <div className={[styles.paginationContainer, styles[theme]].join(' ')}>
      <ul className={styles.pagination}>
        <li
          className={
            page === 1 ? [styles.prev, styles.disabled].join(' ') : styles.prev
          }
        >
          <Link
            to="/?page=1"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            ←
          </Link>
        </li>

        {numLinkList.map((num) => (
          <li key={num} className={num === page ? styles.active : ''}>
            <Link
              to={`/?page=${num}`}
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
            >
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
          <Link
            to={`/?page=${pagesCount}`}
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            →
          </Link>
        </li>
      </ul>
    </div>
  );
}
