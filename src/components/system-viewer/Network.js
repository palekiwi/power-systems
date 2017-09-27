import React from 'react';
import PropTypes from 'prop-types';
import isometricTile from '../../lib/isometric-tile.js';
import './Network.scss';

Network.propTypes = {
  grid: PropTypes.object.isRequired,
  structureTiles: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired,
  powerData: PropTypes.object.isRequired
};

function Network ({grid, structureTiles, time, powerData}) {
  let distLines = [];
  let genLines = [];
  let batLines = [];

  let distributor = structureTiles.find(el => el.category == 'distributor');
  let generators = structureTiles.filter(el => el.category == 'generator');
  let consumers = structureTiles.filter(el => el.category == 'consumer');
  let batteries = structureTiles.filter(el => el.category == 'battery');

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

    batLines = batteries.map(g => {
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

  return (
    <div className="Network">
      <svg>
        {genLines.map((line, i) =>
          <g key={i} className={isActive(powerData, 'power', line[2].id, time) > 0 ? 'active' : ''}>
            <path d={link(line)} className={"powerline " + line[2].tag}/>
            <path d={link(line)} className="powerflow"/>
          </g>
        )}

        {batLines.map((line, i) =>
          <g key={i} className={isActive(powerData, 'buffer', line[2].id, time) > 0 ? 'active charge' : '' + (isActive(powerData, 'buffer', line[2].id, time) < 0 ? 'active discharge' : '')}>
            <path d={link(line)} className={"powerline " + line[2].tag}/>
            <path d={link(line)} className="powerflow"/>
          </g>
        )}

        {distLines.map((line, i) =>
          <g key={i} className={'active'}>
            <path d={link(line)} className="powerline load"/>
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

function isActive (powerData,field, x, time) {
  return powerData[x][time/86400 * 288][field];
}
