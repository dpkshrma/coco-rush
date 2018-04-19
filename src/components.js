import React from 'react';
import styled from "styled-components";
import { Motion, spring, presets } from 'react-motion';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #673ab7;
`;
export const Logo = styled.div`
  font-family: "Disko";
  color: white;
  align-self: center;
  font-size: 72px;
  margin: 24px;
`;
export const ChocoBoxes = styled.div`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
`;
export const ChocoBox = ({ children, ...restProps }) => {
  const ChocoBoxWrapper = styled.div`
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
  const defaultStyle = {
    zoom: 0
  };
  const style = {
    zoom: spring(1, presets.wobbly)
  }
  return (
    <Motion
      defaultStyle={defaultStyle}
      style={style}
    >
      {
        ({ zoom }) => (
          <ChocoBoxWrapper {...restProps} style={{ transform: `scale(${zoom})` }}>
            {children}
          </ChocoBoxWrapper>
        )
      }
    </Motion>
  );
};
export const Chocolate = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;
export const ChocoImg = styled.img`
  max-height: 80px;
  max-width: 80px;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
`;
export const Loading = () => {
  const Container = styled.div`
    color: white;
    font-size: 24px;
  `;
  return (
    <Container>Loading...</Container>
  );
};
