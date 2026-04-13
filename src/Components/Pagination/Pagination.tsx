import { FC } from "react";
import { range } from "../../helpers/range";
import { postPerPage } from "../../variables";
import styles from "./pagination.module.scss";

type Props = {
  postsCount: number;
  changePage: (v: number) => void;
  currentPage: number;
};

export const Pagination: FC<Props> = ({
  postsCount,
  changePage,
  currentPage,
}) => {
  return (
    <div className={styles.wrapper}>
      {range(0, postsCount, postPerPage).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={index}
            disabled={currentPage === page}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
