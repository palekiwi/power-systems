/* global describe, it, expect */
import texture from '../../lib/texture.js';

describe('texture()', () => {
  it('returns a texture object with a filename, size, frame count and animation options', () => {
    let opts = {filename: 'a.png'};
    let res = texture(opts);

    expect(res.filename).toBeDefined();
    expect(res.size).toBeDefined();
    expect(res.frames).toEqual(1);
    expect(res.loop).toBe(false);
    expect(res.reverse).toBe(false);
  });
});
