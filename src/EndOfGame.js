import React from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import ReplayImg from './images/rotating-arrow-to-the-left.svg';

const Container = styled.div`
  position: absolute;
  align-self: center;
  color: white;
  font-family: fantasy, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 40px;
`;
const DonateBtn = styled.a`
  margin-top: 72px;
  font-size: 20px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #fff3;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 32px 10px #7bfff9;
  text-decoration: none;
  &:hover {
    box-shadow: 0 0 32px 10px #fffdbc;
  }
`;
const HappyEmoji = ({ excite }) => {
  const Container = styled.div`
    font-size: 32px;
    padding: 0 8px;
    margin-bottom: -10px;
  `;
  if (excite) {
    return <Container>😃</Container>;
  }
  return <Container>🙂</Container>;
};
const ReplayBtn = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
`;
const ReplayIcon = () => {
  const Img = styled.img`
    height: 20px;
    padding: 0 8px;
    transform: rotate(-45deg);
  `;
  return <Img src={ReplayImg} />;
};
const ReplayText = styled.span`
  &:hover {
    border-bottom: 1px dashed #fff;
  }
`;

class EndOfGame extends React.Component {
  state = {
    hovering: false,
  };
  render() {
    const { hovering } = this.state;
    const defaultStyle = { opacity: 0 };
    const style = { opacity: spring(1, { stiffness: 20, damping: 10 }) };
    return (
      <Motion style={style} defaultStyle={defaultStyle}>
        {
          ({ opacity }) => (
            <Container style={{ opacity }}>
              <Title>Awesome!!! You did it! :)</Title>
              <ReplayBtn>
                <ReplayIcon />
                <ReplayText>Play Again ?</ReplayText>
              </ReplayBtn>
              <DonateBtn
                href="https://www.paypal.me/dpkshrma/2usd"
                target="_blank"
                onMouseEnter={() => !hovering && this.setState({ hovering: true })}
                onMouseLeave={() => hovering && this.setState({ hovering: false })}
              >
                <HappyEmoji excite={hovering} />
                <div>Buy me some chocolates?</div>
                <HappyEmoji excite={hovering} />
              </DonateBtn>
            </Container>
          )
        }
      </Motion>
    );
  }
}

export default EndOfGame;
