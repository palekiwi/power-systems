import React from 'react';
import PropTypes from 'prop-types';
import isometricTile from '../../lib/isometric-tile.js';
import './Network.scss';

Network.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired
};

function Network ({grid, structureTiles}) {
  let distLines = [];
  let genLines = [];

  let distributor = structureTiles.find(el => el.category == 'distributor');
  let generators = structureTiles.filter(el => el.category == 'generator');
  let consumers = structureTiles.filter(el => el.category == 'consumer');

  if (distributor) {
    genLines = generators.map(g => {
      let source = isometricTile(grid, g);
      let target = isometricTile(grid, distributor);
      return [
        {x: source.midX(), y: source.midY()},
        {x: target.midX(), y: target.midY()},
        g
      ];
    });

    distLines = consumers.map(c => {
      let source = isometricTile(grid, distributor);
      let target = isometricTile(grid, c);
      return [
        {x: source.midX(), y: source.midY()},
        {x: target.midX(), y: target.midY()},
      ];
    });
  }

  let activeGens = generators.some(el => el.active);

  return (
    <div className="Network">
      <svg>
        {genLines.map((line, i) =>
          <g key={i} className={line[2].active ? 'active' : ''}>
            <path d={link(line)} className="powerline generation"/>
            <path d={link(line)} className="powerflow"/>
          </g>
        )}

        {distLines.map((line, i) =>
          <g key={i} className={activeGens ? 'active' : ''}>
            <path d={link(line)} className="powerline distribution"/>
            <path d={link(line)} className="powerflow"/>
          </g>
        )}
      </svg>
    </div>
  );
}

export default Network;

// draw curved lines between source and target points
function link ([s, t]) {
  return [
    'M',
    [s.x, s.y],
    'Q',
    [t.x + (s.x - t.x) / 2, t.y - 20],
    [t.x, t.y]
  ].join(' ');
}
