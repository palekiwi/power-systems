import React from 'react';
import PropTypes from 'prop-types';
import propEq from 'ramda/src/propEq';
import prop from 'ramda/src/prop';
import './ChartLegend.scss';

ChartLegend.propTypes = {
  toggleLegendField: PropTypes.func.isRequired,
  structureTiles: PropTypes.array.isRequired,
  legend: PropTypes.object.isRequired
};

function ChartLegend (props) {
  return (
    <div>
      <div className="ChartLegend__Controls">
        <button
          onClick={() => props.toggleLegendField('totalLoad')}
          className={"button totalLoad is-small" + (props.legend.totalLoad ? '' : ' is-inverted')}>
          Load
        </button>

          <button
            onClick={() => props.toggleLegendField('totalGen')}
            className={"button totalGen is-small" + (props.legend.totalGen ? '' : ' is-inverted')}>
            Generation
          </button>

          <button
            onClick={() => props.toggleLegendField('totalFeed')}
            className={"button totalFeed is-small" + (props.legend.totalFeed ? '' : ' is-inverted')}>
            Feed
          </button>

        {
          props.structureTiles.filter(prop('buffer')).length > 0 &&
          <button
            onClick={() => props.toggleLegendField('totalBuffer')}
            className={"button buffer is-small" + (props.legend.totalBuffer ? '' : ' is-inverted')}>
            Battery Buffer
          </button>
        }
          <button
            onClick={() => props.toggleLegendField('totalRamped')}
            className={"button totalRamped is-small" + (props.legend.totalRamped ? '' : ' is-inverted')}>
            Ramped Variable
          </button>

        {
          props.structureTiles.filter(prop('storage')).length > 0 &&
            <button
              onClick={() => props.toggleLegendField('totalStorage')}
              className={"button storage is-small" + (props.legend.totalStorage ? '' : ' is-inverted')}>
              Battery Storage
            </button>
        }

        {props.structureTiles
          .filter(propEq('category', 'generator'))
          .map(s => (
            <button
              key={s.id}
              onClick={() => props.toggleLegendField(s.id)}
              className={"button is-small " + s.tag + (props.legend[s.id] ? '' : ' is-inverted')}>
              {s.name}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default ChartLegend;
