import { Card, Flex, Skeleton } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Post.module.scss";
import type { Post as TPost } from "../../App";

type IsLoading = "loading" | "complete" | "error";

export const Post: FC = () => {
  const [post, setPost] = useState<TPost>();
  const [state, setState] = useState<IsLoading>("loading");
  const { postId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const responce = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
        );
        const data: TPost = await responce.json();
        setPost(data);
        setState("complete");
      } catch (e) {
        console.log((e as Error).message);
        setState("error");
      }
    }
    getData();
  }, [postId]);

  return (
    <div className={styles.wrapper}>
      {state === "loading" && <Skeleton active />}
      {state === "complete" && post && (
        <Flex gap="medium" align="start" vertical>
          <Card style={{ minWidth: "100%" }}>
            <Card.Meta title={post.title} description={<p>{post.body}</p>} />
          </Card>
        </Flex>
      )}
      {state === "error" && <div>Something went wrong</div>}
    </div>
  );
};
