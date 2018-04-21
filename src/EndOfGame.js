import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Motion, spring } from 'react-motion';
import ReplayImg from './images/rotating-arrow-to-the-left.svg';

const Container = styled.div`
  position: absolute;
  align-self: center;
  color: white;
  font-family: ArchitectsDaughter, fantasy, sans-serif;
  letter-spacing: 1px;
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
  text-decoration: none;
  &:hover {
    box-shadow: 0 0 32px 10px #fffdbc;
  }
`;
const HappyEmoji = ({ excite }) => {
  const Container = styled.span`
    font-size: 32px;
    padding: 0 8px;
    margin-bottom: -10px;
  `;
  if (excite) {
    return (
      <Container>
        <span role="img" aria-label="happy">😃</span>
      </Container>
    );
  }
  return (
    <Container>
      <span role="img" aria-label="slightly happy">🙂</span>
    </Container>
  );
};
const ReplayIcon = () => {
  const Img = styled.img`
    height: 16px;
    padding: 0 8px;
    transform: rotate(-45deg);
  `;
  return <Img className="replay-icon" src={ReplayImg} />;
};
const rotate360 = keyframes`
  from {
    transform: rotate(315deg);
  }
  to {
    transform: rotate(-45deg);
  }
`;
const ReplayBtn = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  &:hover .replay-icon {
    animation: ${rotate360} 2s linear infinite;
  }
`;
const ReplayText = styled.span``;
const Record = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
`
const RecordClicks = styled.div`
  font-family: Disko;
  margin-left: 8px;
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
              {
                this.props.newRecord ?
                <Record>
                  New Record: <RecordClicks size={16}>{this.props.record}</RecordClicks>
                </Record> :
                <Record>
                  Personal Best: <RecordClicks size={16}>{this.props.record}</RecordClicks>
                </Record>
              }
              {
                this.props.newRecord ?
                <Title>You hit a personal best! \o/</Title> :
                <Title>Awesome!!! You did it! :)</Title>
              }
              <ReplayBtn onClick={this.props.replay}>
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
