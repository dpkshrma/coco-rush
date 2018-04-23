import React from 'react';
import styled, { css, keyframes } from "styled-components";
import { Motion, spring } from 'react-motion';
import chroma from 'chroma-js';
import soundOnImg from './images/soundOn.svg';
import soundOffImg from './images/soundOff.svg';
import pointerImg from './images/pointer.svg';
import twitterLogo from './images/twitter-logo.svg';
import githubLogo from './images/github-logo.svg';
import { shareUrl, forkUrl } from './config';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ bgColor='#673ab7' }) => bgColor};
  background: #67B26F;  /* fallback for old browsers */
  background: linear-gradient(to top, #4ca2cd, #67B26F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 100;
`;
export const ColorTransition = ({ gradients, onTransitionEnd, children, ...restProps }) => {
  const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    z-index: 10;
  `;
  const defaultStyle = { f: 0 };
  const springConf = { stiffness: 5, damping: 10 };
  const style = {
    f: spring(1, springConf)
  };
  return (
    <Motion key={gradients.to[0]} style={style} defaultStyle={defaultStyle} onRest={onTransitionEnd}>
      {
        ({ f }) => {
          const color1 = chroma.interpolate(gradients.from[0], gradients.to[0], f).hex();
          const color2 = chroma.interpolate(gradients.from[1], gradients.to[1], f).hex();
          const background = `linear-gradient(to bottom, ${color1}, ${color2})`;
          return (
            <Container style={{ background }} {...restProps}>
              {children}
            </Container>
          );
        }
      }
    </Motion>
  );
};
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
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 300px;
  min-width: 300px;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
`;
export const ChocoBox = ({ children, found, gameCompleted, ...restProps }) => {
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
  const springConf = { stiffness: 40, damping: 10 };
  const defaultStyle = {
    zoom: gameCompleted ? 1 : 0
  };
  const style = {
    zoom: gameCompleted ? spring(0, springConf) : spring(1, springConf)
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
  const Container = styled.div`
    position: absolute;
    top: 32px;
    right: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;
  const Img = styled.img`
    cursor: pointer;
    height: 32px;
    display: ${({ show }) => show ? 'block' : 'none'};
  `;
  const LoadingMusic = styled.div`
    font-size: 20px;
    color: #fff
    font-family: ArchitectsDaughter, fantasy;
  `;
  return (
    <Container>
      <Img src={soundOnImg} show={!props.mute} {...props} />
      <Img src={soundOffImg} show={props.mute} {...props} />
      {
        props.loading &&
        <LoadingMusic>Buffering...</LoadingMusic>
      }
    </Container>
  );
};
export const GameStats = styled.div`
  display: flex;
  align-items: center;
  visibility: ${({ show }) => show ? 'visible' : 'hidden' };
`;
const StatImg = styled.img`
  height: 40px;
  border-radius: 50%;
  border: 3px dashed white;
  padding: 8px;
  opacity: 0.7;
  margin-top: -12px;
`;
export const ClickIcon = () => <StatImg src={pointerImg} />;
export const ClickCount = BubbleText.extend`
  margin: 12px;
`;
export const ShareForkBtns = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  left: 16px;
`;
const ShareForkBtn = styled.a`
  border-radius: 3px;
  color: #fff;
  padding: 4px 16px;
  font-size: 12px;
  font-family: sans-serif;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 12px;
  height: 20px;
  letter-spacing: 1px;
  &:hover {
    box-shadow: 0 2px 4px #111;
  }
`;
const Img = styled.img`
  height: 16px;
  margin-right: 6px;
`;
export const TwitterShareBtn = () => {
  const Btn = ShareForkBtn.extend`
    background: #1b95e0;
  `;
  return (
    <Btn href={shareUrl} target="_blank">
      <Img src={twitterLogo} />
      Share
    </Btn>
  );
};
export const GithubStarBtn = () => {
  const Btn = ShareForkBtn.extend`
    background: #333;
  `;
  return (
    <Btn href={forkUrl} target="_blank">
      <Img src={githubLogo} />
      Star
    </Btn>
  )
};
