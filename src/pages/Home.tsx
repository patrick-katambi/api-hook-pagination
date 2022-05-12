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
    const itemsPerPage = 15;

    const { slicedData: postList, pageArray: postsPageArray } =
      paginationConstructor({
        data: Array.isArray(posts) ? posts : [],
        itemsPerPage: 15,
        currentPageNumber: postsCurrentPage,
      });

    const { slicedData: todoList, pageArray: todosPageArray } =
      paginationConstructor({
        data: Array.isArray(todos) ? todos : [],
        itemsPerPage: 13,
        currentPageNumber: todosCurrentPage,
      });

    return (
      <>
        <Title
          style={{
            width: "fit-content",
            margin: "50px 0 0 10%",
            fontSize: "xx-large",
            color: "#fff",
            padding: 0,
            backgroundColor: "transparent",
          }}
        >
          Custom API Hook & pagination workshop.
        </Title>
        <MainContainer>
          <Container>
            <Title>Posts</Title>
            {postList && Array.isArray(postList) ? (
              <Listing
                list={postList}
                pageArray={postsPageArray}
                currentPage={postsCurrentPage}
                pageSetter={setpostsCurrentPage}
              />
            ) : (
              ""
            )}
          </Container>

          {/* <Container>
            <Title>Todos</Title>
            {todoList && Array.isArray(todoList) ? (
              <Listing
                list={todoList}
                pageArray={todosPageArray}
                currentPage={todosCurrentPage}
                pageSetter={setTodosCurrentPage}
              />
            ) : (
              ""
            )}
          </Container> */}
        </MainContainer>
      </>
    );
  }
}

function paginationConstructor({
  data,
  itemsPerPage,
  currentPageNumber,
}: {
  data: [];
  itemsPerPage: number;
  currentPageNumber: number;
}) {
  const startIndex = currentPageNumber * itemsPerPage - itemsPerPage + 1;
  const endIndex = currentPageNumber * itemsPerPage;
  const slicedData = data.slice(startIndex - 1, endIndex);

  const totalData = data.length;
  const pageCount = Math.ceil(totalData / itemsPerPage);

  let pageArray = [];
  for (let index = 0; index < pageCount; index++) {
    pageArray.push(index + 1);
  }

  return { slicedData, pageArray };
}

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
          justifyContent: "flex-start",
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

function Listing({
  list,
  pageArray,
  currentPage,
  pageSetter,
}: {
  list: any[];
  pageArray: number[];
  currentPage: number;
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      {list.map((item: any) => {
        return (
          <Paragraph key={item.id}>
            <Span>{item.id}.</Span>
            {item.title}
          </Paragraph>
        );
      })}
      <PaginationComponent
        pageArray={pageArray}
        currentPage={currentPage}
        setCurrentPage={pageSetter}
      />
    </>
  );
}
