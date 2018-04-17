import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #673ab7;
`;
export const ChocoBoxes = styled.div`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
`;
export const ChocoBox = styled.div`
  height: 80px;
  flex: 0 0 80px;
  background: #fff;
  margin: 20px;
  cursor: pointer;
  border-radius: 4px;
  color: #555;
  font-size: 40px;
  display: flex;
`;
export const Chocolate = styled.div`
  margin: auto;
`;
