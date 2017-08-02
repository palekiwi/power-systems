module.exports = function vector (x, y) {
  const proto = {
    x,
    y,
    toString: () => `(${x},${y})`,
    plus: (v2) => vector(x + v2.x, y + v2.y),
    minus: (v2) => vector(x - v2.x, y - v2.y),
    equals: v2 => (x === v2.x && y === v2.y)
  };

  return Object.create(proto);
};
