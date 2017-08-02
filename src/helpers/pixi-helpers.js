import head from 'ramda/src/head';
import tail from 'ramda/src/tail';

export function drawShape (tool, points) {
  tool.lineStyle(2, 0x333333, 1);
  let h = head(points);
  let t = tail(points);
  tool.moveTo(h.x, h.y);
  t.forEach(p => tool.lineTo(p.x, p.y));
  tool.closePath();
}
