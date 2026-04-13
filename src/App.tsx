import React, { useState, useEffect } from "react";
import styles from "./app.module.scss";
import { Pagination } from "./Components/Pagination";
import { Card, Flex, Skeleton } from "antd";
import { range } from "./helpers/range";
import { postPerPage } from "./variables";

type Post = {
  body: string;
  title: string;
  id: number;
};

function App() {
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
      const data = await responce.json();
      setPosts(data);

      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading &&
        range(0, postPerPage, 1).map((index) => (
          <Skeleton active key={index} />
        ))}
      {!isLoading &&
        postsOnPage.map(({ id, title, body }) => (
          <Flex key={id} gap="medium" align="start" vertical>
            <Card loading={isLoading} style={{ minWidth: "100%" }}>
              <Card.Meta title={title} description={<p>{body}</p>} />
            </Card>
          </Flex>
        ))}
      <Pagination
        numOfPosts={posts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
