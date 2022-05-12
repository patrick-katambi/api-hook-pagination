import { useState } from "react";
import { Container } from "../components/container";
import { MainContainer } from "../components/main-container";
import { Paragraph } from "../components/paragraph";
import { Span } from "../components/span";
import { Title } from "../components/title";
import { log } from "../functions/console-log";
import { useXHR } from "../hooks/use-XHR";
import gif from "../assets/loading.gif";

export default function Home() {
  const { loading: postsLoading, data: posts } = useXHR("posts");
  const { loading: todosLoading, data: todos } = useXHR("todos");

  const [postsCurrentPage, setpostsCurrentPage] = useState<number>(1);
  const [todosCurrentPage, setTodosCurrentPage] = useState<number>(1);

  if (postsLoading && todosLoading) {
    return (
      <MainContainer>
        <img style={{ margin: "auto", height: 200, width: 200 }} src={gif} />
      </MainContainer>
    );
  } else {
    /**
     * pagination algorithm
     */
    const itemsPerPage = 15;

    const totalPosts = Array.isArray(posts) ? posts.length : 0;
    const postsPageCount = Math.ceil(totalPosts / itemsPerPage);
    const postsStartIndex = postsCurrentPage * itemsPerPage - itemsPerPage + 1;
    const postsEndIndex = postsCurrentPage * itemsPerPage;
    const postList = Array.isArray(posts)
      ? posts.slice(postsStartIndex - 1, postsEndIndex)
      : [];

    let postsPageArray = [];
    for (let index = 0; index < postsPageCount; index++) {
      postsPageArray.push(index + 1);
    }

    const totalTodos = Array.isArray(todos) ? todos.length : 0;
    const todosPageCount = Math.ceil(totalTodos / itemsPerPage);
    const todosStartIndex = todosCurrentPage * itemsPerPage - itemsPerPage + 1;
    const todosEndIndex = todosCurrentPage * itemsPerPage;
    const todoList = Array.isArray(todos)
      ? todos.slice(todosStartIndex - 1, todosEndIndex)
      : [];

    let todosPageArray = [];
    for (let index = 0; index < todosPageCount; index++) {
      todosPageArray.push(index + 1);
    }

    return (
      <>
        <Title
          style={{
            margin: "50px 0 0 10%",
            fontSize: "xx-large",
            color: "#fff",
          }}
        >
          Custom API Hook & pagination in workshop
        </Title>
        <MainContainer>
          <Container>
            <Title>Posts</Title>
            {postList && Array.isArray(postList) ? (
              <>
                {postList.map((post: any) => {
                  return (
                    <Paragraph key={post.id}>
                      <Span>{post.id}.</Span>
                      {post.title}
                    </Paragraph>
                  );
                })}
                <PaginationComponent
                  pageArray={postsPageArray}
                  currentPage={postsCurrentPage}
                  setCurrentPage={setpostsCurrentPage}
                />
              </>
            ) : (
              ""
            )}
          </Container>

          <Container>
            <Title>Todos</Title>
            {todoList && Array.isArray(todoList) ? (
              <>
                {todoList.map((todo: any) => {
                  return (
                    <Paragraph key={todo.id}>
                      <Span>{todo.id}.</Span>
                      {todo.title}
                    </Paragraph>
                  );
                })}
                <PaginationComponent
                  pageArray={todosPageArray}
                  currentPage={todosCurrentPage}
                  setCurrentPage={setTodosCurrentPage}
                />
              </>
            ) : (
              ""
            )}
          </Container>
        </MainContainer>
      </>
    );
  }
}

/**
 * pagination component
 */
const PaginationComponent = ({
  pageArray,
  currentPage,
  setCurrentPage,
}: {
  pageArray: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleClick = (index: number) => setCurrentPage(index);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {pageArray.map((page: number, index: number) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(page)}
              style={{
                height: 50,
                width: 50,
                marginLeft: index === 0 ? 0 : 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                color: currentPage - 1 === index ? "#111" : "#fff",
                backgroundColor: currentPage - 1 === index ? "beige" : "tomato",
                cursor: "pointer",
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
    </>
  );
};
