import React from "react";
import {
  Container,
  Logo,
  ChocoBoxes,
  ChocoBox,
  Chocolate,
  ChocoImg
} from "./components";
import helpers from "./helpers";
import { chocoImages } from "./images";

/**
 * Game Component
 */
export default class Game extends React.Component {
  state = {
    chocolates: helpers.getChocolates(),
    visibleChocos: [],
    foundChocos: []
  };

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

  render() {
    const { chocolates, visibleChocos, foundChocos } = this.state;
    return (
      <Container>
        <Logo>coco rush</Logo>
        <ChocoBoxes>
          {chocolates.map(choco => {
            return (
              <ChocoBox key={choco.id} onClick={() => this.showChoco(choco)}>
                <Chocolate>
                  {/* display only visible or matched chocos */}
                  {(visibleChocos.indexOf(choco.id) !== -1 ||
                    foundChocos.indexOf(choco.value) !== -1) && (
                    <ChocoImg src={chocoImages[choco.value]} />
                  )}
                </Chocolate>
              </ChocoBox>
            );
          })}
        </ChocoBoxes>
      </Container>
    );
  }
}
