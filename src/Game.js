import React from "react";
import promisifySetState from 'promisify-setstate';
import ReactHowler from 'react-howler';
import withTracker from './withTracker';
import {
  Container,
  Wrapper,
  BubbleText,
  ChocoBoxes,
  ChocoBox,
  Chocolate,
  ChocoImg,
  Loading,
  BGMusicToggle,
  GameStats,
  ClickIcon,
  ClickCount,
  ShareForkBtns,
  TwitterShareBtn,
  GithubStarBtn,
  ColorTransition
} from "./components";
import FollowMe from './FollowMe';
import EndOfGame from './EndOfGame';
import helpers from "./helpers";
import { chocoImages } from "./images";
import { gradientColors } from './config';

const INITIAL_STATE = {
  chocolates: helpers.getChocolates(),
  visibleChocos: [],
  foundChocos: [],
  loading: true,
  mute: false,
  matchFound: false,
  clicks: 0,
  gameCompleted: false,
  showEndOfGame: false,
  currentRecord: 0,
  bgMusicLoading: true,
  currentGradientTransition: {
    from: gradientColors[0],
    to: gradientColors[0],
    pos: 0,
  }
};

/**
 * Game Component
 */
class Game extends React.Component {
  state = INITIAL_STATE;
  loadedChocos = [];

  /**
   * Returns true if given choco has same value as the visible one
   */
  checkChocoMatch = secondChoco => {
    const { visibleChocos, chocolates } = this.state;
    const [firstChocoId] = visibleChocos;

    // get visible choco object
    const firstChoco =
      chocolates.find(choco => choco.id === firstChocoId) || {};

    if (firstChoco.value === secondChoco.value) {
      return true;
    }

    return false;
  };

  /**
   * Displays hidden choco on click
   *
   * Adds choco id to visible chocos array
   * If the visible chocos match, add choco value to found chocos array
   */
  showChoco = choco => {
    const { visibleChocos, foundChocos, chocolates } = this.state;

    // do not add the choco again if already added in visible chocos array
    if (visibleChocos.indexOf(choco.id) === -1 && foundChocos.indexOf(choco.value) === -1) {
      const clicks = this.state.clicks + 1;

      // there can be only 2 chocos visible at a time
      if (visibleChocos.length < 2) {
        let newChocosFound = foundChocos;
        let matchFound = false;
        if (this.checkChocoMatch(choco)) {
          newChocosFound = [...foundChocos, choco.value];
          matchFound = true;
        }
        let gameCompleted = false;
        if (newChocosFound.length === chocolates.length/2) {
          gameCompleted = true;
        }

        this.setState({
          visibleChocos: [...visibleChocos, choco.id],
          foundChocos: newChocosFound,
          matchFound,
          gameCompleted,
          clicks
        })
          .then(() => {
            // show end of game message after a sec
            if (this.state.gameCompleted) {
              this.props.track({
                category: 'Game',
                action: 'Game Completed',
                value: clicks
              });
              let currentRecord = localStorage.getItem('record');
              if (!currentRecord || (clicks < parseInt(currentRecord, 10))) {
                localStorage.setItem('record', clicks);
                currentRecord = clicks;
              }
              setTimeout(() => this.setState({ showEndOfGame: true, currentRecord }), 1000);
            }
          });

      } else {
        // reset to show only clicked choco if 2 chocos visible
        this.setState({ visibleChocos: [choco.id], clicks });
      }
    }
  };

  /**
   * Triggered after a choco image is loaded
   * Adds choco to loadedChocos array, turns off loading if all loaded
   */
  onChocoLoad = (chocoValue) => {
    if (!this.state.loading) {
      return;
    }
    if (this.loadedChocos.indexOf(chocoValue) === -1) {
      this.loadedChocos = [...this.loadedChocos, chocoValue];
      if (this.loadedChocos.length === chocoImages.length) {
        this.setState({ loading: false });
      }
    }
  }

  cycleBackgroundGradients = () => {
    const { currentGradientTransition: prevTransition } = this.state;
    setTimeout(() => {
      const pos = (prevTransition.pos + 1) % gradientColors.length;
      const newTransition = {
        from: prevTransition.to,
        to: gradientColors[pos],
        pos
      };
      this.setState({
        currentGradientTransition: newTransition
      });
    }, 500);
  };

  resetGame = () => {
    this.props.track({
      category: 'Game',
      action: 'Reset Clicked'
    });
    this.setState(Object.assign({}, INITIAL_STATE, { loading: false }));
  };

  render() {
    const {
      chocolates,
      visibleChocos,
      foundChocos,
      loading,
      mute,
      showEndOfGame,
      clicks,
      currentRecord,
      bgMusicLoading,
      currentGradientTransition,
    } = this.state;

    return (
      <Container>
        <Wrapper>
          <ReactHowler
            src={"/sounds/Podington_Bear_-_09_-_Sunset_Stroll_Into_The_Wood.mp3"}
            playing={!mute}
            loop={true}
            preload={true}
            onLoad={() => this.setState({ bgMusicLoading: false })}
          />
          <ReactHowler
            src={"/sounds/186719__andromadax24__chime-01.wav"}
            playing={this.state.matchFound}
            onEnd={() => { this.setState({ matchFound: false }); }}
            preload={true}
          />
          <ShareForkBtns>
            <TwitterShareBtn />
            <GithubStarBtn />
          </ShareForkBtns>
          <BGMusicToggle
            loading={bgMusicLoading}
            onClick={() => this.setState({ mute: !this.state.mute })}
            mute={mute}
          />
          <BubbleText>coco rush</BubbleText>
          {
            loading &&
            <Loading />
          }
          <ChocoBoxes show={!loading}>
            {
              showEndOfGame &&
              <EndOfGame
                replay={this.resetGame}
                newRecord={clicks === currentRecord}
                record={currentRecord}
                track={this.props.track}
              />
            }
            {
              chocolates.map(choco => {
                return (
                  <ChocoBox
                    key={choco.id}
                    onClick={() => this.showChoco(choco)}
                    found={foundChocos.indexOf(choco.value) !== -1}
                    gameCompleted={showEndOfGame}
                    >
                      <Chocolate>
                        <ChocoImg
                          src={chocoImages[choco.value]}
                          onLoad={() => this.onChocoLoad(choco.value)}
                          onError={console.error}
                          show={
                            visibleChocos.indexOf(choco.id) !== -1 ||
                            foundChocos.indexOf(choco.value) !== -1
                          }
                        />
                      </Chocolate>
                    </ChocoBox>
                  );
                })
              }
          </ChocoBoxes>
          <GameStats show={!loading}>
            <ClickIcon />
            <ClickCount>{this.state.clicks}</ClickCount>
          </GameStats>
          <FollowMe />
        </Wrapper>
        <ColorTransition
          gradients={currentGradientTransition}
          onTransitionEnd={this.cycleBackgroundGradients}
        />
      </Container>
    );
  }
}

export default withTracker(promisifySetState(Game));
