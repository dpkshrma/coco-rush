import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { Motion, spring } from 'react-motion';
import soundOnImg from './images/soundOn.svg';
import soundOffImg from './images/soundOff.svg';
import pointerImg from './images/pointer.svg';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #673ab7;
`;
export const BubbleText = styled.div`
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
export const ChocoBox = ({ children, found, ...restProps }) => {
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
    &:hover {
      box-shadow: 0 0 42px 12px #fffdbc;
    }
    ${ found && css`box-shadow: 0 0 42px 12px #7bfff9;` }
  `;
  const defaultStyle = {
    zoom: 0
  };
  const style = {
    zoom: spring(1, { stiffness: 20, damping: 6 })
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
const zoomAnimation = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(0.9);
  }
`;
export const ChocoImg = styled.img`
  max-height: 80px;
  max-width: 80px;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
  animation: ${zoomAnimation} 1s alternate infinite;
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
export const BGMusicToggle = (props) => {
  const Img = styled.img`
    position: absolute;
    top: 32px;
    right: 32px;
    height: 32px;
    cursor: pointer;
  `;
  let src = soundOnImg;
  if (props.mute) {
    src = soundOffImg;
  }
  return <Img src={src} {...props} />;
};
export const GameStats = styled.div`
  display: flex;
  align-items: center;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
`;
export const ClickIcon = () => {
  const Img = styled.img`
    height: 42px;
    border-radius: 50%;
    border: 2px dashed white;
    padding: 8px;
  `;
  return (
    <Img src={pointerImg} />
  );
};
