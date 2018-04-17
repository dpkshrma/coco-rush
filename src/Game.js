import React from "react";
import { Container, ChocoBoxes, ChocoBox, Chocolate } from "./components";
import helpers from "./helpers";

export default class Game extends React.Component {
  state = {
    chocolates: helpers.getChocolates(),
    visibleChocos: [],
    foundChocos: []
  };

  checkChocoMatch = secondChoco => {
    const { visibleChocos, chocolates } = this.state;
    const [firstChocoId] = visibleChocos;

    const firstChoco =
      chocolates.find(choco => choco.id === firstChocoId) || {};

    if (firstChoco.value === secondChoco.value) {
      return true;
    }

    return false;
  };

  showChoco = choco => {
    const { visibleChocos, foundChocos } = this.state;

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
        <ChocoBoxes>
          {chocolates.map(choco => {
            return (
              <ChocoBox key={choco.id} onClick={() => this.showChoco(choco)}>
                <Chocolate>
                  {(visibleChocos.indexOf(choco.id) !== -1 ||
                    foundChocos.indexOf(choco.value) !== -1) &&
                    choco.value}
                </Chocolate>
              </ChocoBox>
            );
          })}
        </ChocoBoxes>
      </Container>
    );
  }
}
