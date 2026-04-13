import { range } from "../../helpers/range";
import { postPerPage } from "../../variables";
import styles from "./pagination.module.scss";

type Props = {
  numOfPosts: number;
  setCurrentPage: (v: number) => void;
  currentPage: number;
};

export const Pagination = ({
  numOfPosts,
  setCurrentPage,
  currentPage,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {range(0, numOfPosts, postPerPage).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            disabled={currentPage === page}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
