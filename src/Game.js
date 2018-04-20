import React from "react";
import promisifySetState from 'promisify-setstate';
import {
  Container,
  Logo,
  ChocoBoxes,
  ChocoBox,
  Chocolate,
  ChocoImg,
  Loading
} from "./components";
import helpers from "./helpers";
import { chocoImages } from "./images";

/**
 * Game Component
 */
class Game extends React.Component {
  state = {
    chocolates: helpers.getChocolates(),
    visibleChocos: [],
    foundChocos: [],
    loading: true
  };
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
    const { visibleChocos, foundChocos } = this.state;

    // there can be only 2 chocos visible at a time
    // and do not add the choco again if already added in visible chocos array
    if (visibleChocos.length < 2 && visibleChocos.indexOf(choco.id) === -1) {
      let newChocosFound = foundChocos;
      if (this.checkChocoMatch(choco)) {
        newChocosFound = [...foundChocos, choco.value];
      }

      this.setState({
        visibleChocos: [...visibleChocos, choco.id],
        foundChocos: newChocosFound
      });
    } else {
      this.setState({ visibleChocos: [choco.id] });
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

  render() {
    const { chocolates, visibleChocos, foundChocos, loading } = this.state;
    return (
      <Container>
        <Logo>coco rush</Logo>
        {
          loading &&
          <Loading />
        }
        <ChocoBoxes show={!loading}>
          {
            chocolates.map(choco => {
              return (
                <ChocoBox
                  key={choco.id}
                  onClick={() => this.showChoco(choco)}
                  found={foundChocos.indexOf(choco.value) !== -1}
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
      </Container>
    );
  }
}

export default promisifySetState(Game);
