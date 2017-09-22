import React from 'react';
import PropTypes from 'prop-types';
import propEq from 'ramda/src/propEq';
import prop from 'ramda/src/prop';
import './ChartLegend.scss';

BatteryChartLegend.propTypes = {
  toggleLegendField: PropTypes.func.isRequired,
  structureTiles: PropTypes.array.isRequired,
  legend: PropTypes.object.isRequired
};

function BatteryChartLegend (props) {
  return (
    <div>
      <div className="ChartLegend__Controls">
        {props.structureTiles
          .filter(propEq('category', 'battery'))
          .map(s => (
            <button
              key={s.id}
              onClick={() => props.toggleLegendField(s.id)}
              className={"button is-small " + (s.buffer ? 'buffer' : 'storage') + (props.legend[s.id] ? '' : ' is-inverted')}>
              {s.buffer ? 'Buffer' : 'Storage'}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default BatteryChartLegend;
