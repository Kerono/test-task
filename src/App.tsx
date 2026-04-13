import React, { useState, useEffect } from "react";
import styles from "./app.module.scss";
import { Pagination } from "./Components/Pagination";
import { Card, Flex, Skeleton } from "antd";
import { range } from "./helpers/range";
import { postPerPage } from "./variables";
import { Link } from "react-router";

export type Post = {
  body: string;
  title: string;
  id: number;
};

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsOnPage = posts.slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage,
  );

  useEffect(() => {
    async function getData() {
      const responce = await fetch(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      const data: Post[] = await responce.json();
      setPosts(data);

      setIsLoading(false);
    }
    getData();

    const storageInfo = Number(window.localStorage.getItem("page"));
    setCurrentPage(storageInfo || 1);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("page", currentPage.toString());
  }, [currentPage]);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading &&
        range(0, postPerPage, 1).map((index) => (
          <Skeleton active key={index} />
        ))}
      {!isLoading &&
        postsOnPage.map(({ id, title, body }) => (
          <Link className={styles["card-wrapper"]} key={id} to={`/${id}`}>
            <Flex gap="medium" align="start" vertical>
              <Card style={{ minWidth: "100%" }}>
                <Card.Meta title={title} description={<p>{body}</p>} />
              </Card>
            </Flex>
          </Link>
        ))}
      <Pagination
        postsCount={posts.length}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
