import vector from './vector.js';
import randomId from './random-id.js';
import ascend from 'ramda/src/ascend';
import path from 'ramda/src/path';
import sortWith from 'ramda/src/sortWith';

// tile :: (Object, Object, Object) -> Object
const tile = ({texture, position, data = {}}) => {
  return Object.assign(
    {id: randomId()},
    {texture, position},
    data
  );
};

export default tile;

// flatmapToTilesArray :: Array -> Array
export function flatmapToTilesArray (objectsMap) {
  return objectsMap
    .map((col, y) => col
      .map((texture, x) => {
        return tile({texture, position: vector(x, y)});
      })
    )
    .reduce((a, b) => a.concat(b))
    .filter(el => el.texture);
}

export function sortTiles (arr) {
  const cmpX = ascend(path(['position', 'x']));
  const cmpY = ascend(path(['position', 'y']));
  return sortWith([cmpX, cmpY], arr);
}
