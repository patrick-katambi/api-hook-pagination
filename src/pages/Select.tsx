import { MainContainer } from "../components/main-container";
import styled from "styled-components";
import { useState } from "react";
import ClickAwayListener from "react-advanced-click-away";

export function Select({ categories }: { categories: string[] }) {
  const [showSelectItems, setShowSelecteItems] = useState<boolean>(false);
  const [selectedItemText, setSelectedItemText] =
    useState<string>("categories");

  const handleSelectClick = () =>
    setShowSelecteItems(
      (prevState: React.SetStateAction<boolean>) => !prevState
    );

  const handleSetText = (index: number) => {
    setSelectedItemText(
      (prevState: React.SetStateAction<string>) => categories[index]
    );
    setShowSelecteItems(false);
  };

  const handleReset = () => {
    setSelectedItemText("categories");
    setShowSelecteItems(false);
  };

  const handleClickAway = () => setShowSelecteItems(false);

  return (
    <MainContainer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 0",
        color: "#111",
        fontWeight: "bold",

        userSelect: "none",
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div style={{ width: "20%" }}>
          <SelectHeader onClick={handleSelectClick}>
            <p style={{ textOverflow: "ellipsis" }}>{selectedItemText}</p>
            <ArrowDown>👇</ArrowDown>
          </SelectHeader>
          {showSelectItems ? (
            <>
              {categories.map((category: string, index: number) => {
                return (
                  <SelectItem key={index} onClick={() => handleSetText(index)}>
                    {category}
                  </SelectItem>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
      </ClickAwayListener>
      {showSelectItems ? (
        ""
      ) : (
        <p onClick={handleReset} style={{ color: "#fff", cursor: "pointer" }}>
          Reset
        </p>
      )}
    </MainContainer>
  );
}

const SelectHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  text-overflow: ellipsis;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
`;

const SelectItem = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: whitesmoke;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
`;

const ArrowDown = styled.div`
  height: 100%;
  padding: 0 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  background-color: #959595;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
