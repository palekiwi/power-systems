/* global describe, it, expect */
import texture from '../../lib/texture.js';

describe('texture()', () => {
  it('returns a texture object with a filename and size', () => {
    let opts = {filename: 'a.png'};
    let res = texture(opts);

    expect(res.filename).toBeDefined();
    expect(res.size).toBeDefined();
  });
});
