export default function graphic ({width, height, gridSize, ratio = 1.732, minPadding = 1}) {
  let th = Math.min(
    width / (gridSize[0] + minPadding * 2) / ratio,
    height / (gridSize[1] + minPadding * 2)
  );

  let tw = th * ratio;

  let padding = [
    (width - tw * gridSize[0]) / 2,
    (height - th * gridSize[1]) / 2,
  ];

  return {
    padding,
    ratio,
    tile: {
      width: tw,
      height: th,
    }
  };
}
