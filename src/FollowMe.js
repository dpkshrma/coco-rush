import React from 'react';
import styled from 'styled-components';
import promisifySetState from 'promisify-setstate';
import twitterLogo from './images/twitter-logo.svg';
import githubLogo from './images/github-logo.svg';
import mailIcon from './images/closed-envelope-circle.svg';
import chevRightIcon from './images/chevRight.svg';
import successIcon from './images/checked.svg';
import rollingIcon from './images/rolling.svg'
import { req } from './utils/http';

const Subscribe = styled.div`
  font-family: fantasy, sans-serif;
  letter-spacing: 1px;
  color: #fff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  background: #fff2;
  padding: 20px 24px 16px;
  border-radius: 4px;
  position: relative;
`;
const Cross = ({ onClick }) => {
  const Div = styled.div`
    position: absolute;
    top: 4px;
    right: 8px;
    cursor: pointer;
  `;
  return (
    <Div onClick={onClick}>x</Div>
  );
}
const SubscribeForm = styled.form`
  display: flex;
  align-items: center;
`;
const SubscribeInput = styled.input`
  font-family: fantasy, sans-serif;
  vertical-align: middle;
  letter-spacing: 1px;
  color: #fff;
  font-size: 16px;
  outline: none;
  padding: 6px;
  border-radius: 2px;
  background: #fff2;
  border: none;
  margin: 8px 0;
  &::placeholder {
    color: #fff9;
  }
`;
const SubscribeMsg = ({ msg }) => {
  const Msg = styled.div`
    color: #fff;
    font-size: 12px;
  `;
  return (
    <Msg>{msg}</Msg>
  )
};
const SubscribeBtn = ({ subscribing, success, onClick }) => {
  const Btn = styled.div`
    height: 21px;
    background: #fff4;
    display: flex;
    align-items: center;
    border-left: 1px solid #fff7;
    padding: 8px;
    opacity: 0.7;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  `;
  const Img = styled.img`
    height: 16px;
    display: ${({ show }) => show ? 'block' : 'none' };
  `;
  return (
    <Btn onClick={onClick}>
      <Img src={chevRightIcon} show={!subscribing && !success} />
      <Img src={rollingIcon} show={subscribing} />
      <Img src={successIcon} show={success} />
    </Btn>
  );
};
const FolowMeContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
`;
const FollowMeWrapper = styled.div`
  display: flex;
`;
const FollowLink = styled.a`
  text-decoration: none;
`;
const FollowIcon = styled.img`
  height: 32px;
  margin: 8px;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const MailButton = styled.div``;

class FollowMe extends React.Component {
  state = {
    email: '',
    showSubscribe: true,
    subscribing: false,
    subscribeSuccess: false,
    subscribeFailure: false,
  };
  toggleSubscribeBox = (e) => {
    e.preventDefault();
    this.setState({ showSubscribe: !this.state.showSubscribe })
      .then(() => {
        const subscribeInput = document.querySelector('.subscribe-input');
        subscribeInput && subscribeInput.focus();
      });
  };
  subscribe = e => {
    e.preventDefault();
    const { email } = this.state;
    if (email) {
      this.setState({ subscribing: true })
        .then(() => req('subscriptions').post({ email }))
        .then(({ message }) => this.setState({
          subscribing: false,
          subscribeSuccess: message,
          subscribeFailure: false,
        }))
        .catch(err => this.setState({
          subscribing: false,
          subscribeSuccess: false,
          subscribeFailure: err.message,
        }));
    }
  };
  updateEmail = e => this.setState({ email: e.target.value });
  render() {
    const {
      email,
      showSubscribe,
      subscribing,
      subscribeSuccess,
      subscribeFailure
    } = this.state;
    return (
      <FolowMeContainer>
        {
          showSubscribe &&
          <Subscribe>
            Subscribe for More!
            <Cross onClick={this.toggleSubscribeBox} />
            <SubscribeForm onSubmit={this.subscribe}>
              <SubscribeInput
                className="subscribe-input"
                value={email}
                onChange={this.updateEmail}
                placeholder="Email Address"
              />
              <SubscribeBtn
                subscribing={subscribing}
                success={subscribeSuccess}
                onClick={this.subscribe}
              />
            </SubscribeForm>
            {
              subscribeFailure &&
              <SubscribeMsg msg={subscribeFailure} />
            }
            {
              subscribeSuccess &&
              <SubscribeMsg msg={subscribeSuccess} />
            }
          </Subscribe>
        }
        <FollowMeWrapper>
          <FollowLink href="https://github.com/dpkshrma/" target="_blank">
            <FollowIcon src={githubLogo} />
          </FollowLink>
          <FollowLink href="https://twitter.com/dpkshrma01" target="_blank">
            <FollowIcon src={twitterLogo} />
          </FollowLink>
          <MailButton onClick={this.toggleSubscribeBox}>
            <FollowIcon src={mailIcon} />
          </MailButton>
        </FollowMeWrapper>
      </FolowMeContainer>
    );
  }
}

export default promisifySetState(FollowMe);
