import shuffle from "lodash.shuffle";
import shortid from "shortid";

function getChocolates() {
  function getChocoMap() {
    const chocosValues = Array.from({ length: 10 }, (v, i) => i + 1);
    return chocosValues.map(value => ({ value, id: shortid() }));
  }
  return shuffle(getChocoMap()).concat(getChocoMap());
}

export default {
  getChocolates
};
