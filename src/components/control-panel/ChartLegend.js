import React from 'react';
import PropTypes from 'prop-types';
import propEq from 'ramda/src/propEq';

ChartLegend.propTypes = {
  toggleLegendField: PropTypes.func.isRequired,
  toggleStructureActive: PropTypes.func.isRequired,
  activeScene: PropTypes.object,
  legend: PropTypes.object.isRequired
};

function ChartLegend (props) {
  return (
    <div>
      <h4>Chart Legend</h4>
      <div>
        <div>
          <span>Total Load</span>
          <input type="checkbox"
            onChange={() => props.toggleLegendField('totalLoad')}
            checked={props.legend.totalLoad}/>
        </div>
        <div>
          <span>Total Generation</span>
          <input type="checkbox"
            onChange={() => props.toggleLegendField('totalGeneration')}
            checked={props.legend.totalGeneration}/>
        </div>
        {props.activeScene.structureTiles
          .map((s, i) => (
            <div key={i} style={{display: propEq('category', 'generator', s) ? 'auto' : 'none'}}>
              <span>{s.name}</span>
              <input type="checkbox"
                onChange={() => props.toggleStructureActive(i)}
                checked={s.active}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ChartLegend;
