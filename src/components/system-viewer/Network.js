import React from 'react';
import PropTypes from 'prop-types';
import './Network.scss';

Network.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired
};

function Network ({grid, structureTiles}) {
  let distLines = [];
  let genLines = [];

  let distributor = structureTiles.find(el => el.data.type == 'distributor');
  let generators = structureTiles.filter(el => el.data.type == 'generator');
  let consumers = structureTiles.filter(el => el.data.type == 'consumer');

  if (distributor) {
    genLines = generators.map(g => {
      let source = grid.midCoords(g.position);
      let target = grid.midCoords(distributor.position);
      return [
        {x: source.x, y: source.y},
        {x: target.x, y: target.y},
        g.data
      ];
    });

    distLines = consumers.map(c => {
      let source = grid.midCoords(distributor.position);
      let target = grid.midCoords(c.position);
      return [
        {x: source.x, y: source.y},
        {x: target.x, y: target.y}
      ];
    });
  }

  let activeGens = generators.some(el => el.data.active);

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
