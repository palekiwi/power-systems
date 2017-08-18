import vector from './vector.js';

// tile :: (Object, Object, Object) -> Object
const tile = ({texture, position, data = {}}) => {
  return Object.assign({}, {texture, position}, data);
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
