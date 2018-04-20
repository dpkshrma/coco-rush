import shuffle from "lodash.shuffle";
import shortid from "shortid";
import { NUM_CHOCOS } from './config';

/**
 * Returns a random array of chocolate objects
 * Chocolate Object example:
 * {
 *   value: 5,
 *   id: 'BkIwgdX2f'
 * }
 * Each chocolate appears twice in the array with different ids.
 */
function getChocolates() {
  function getChocoMap() {
    const chocosValues = Array.from({ length: NUM_CHOCOS }, (v, i) => i);
    return chocosValues.map(value => ({ value, id: shortid() }));
  }
  return shuffle(getChocoMap().concat(getChocoMap()));
}

export default {
  getChocolates
};
