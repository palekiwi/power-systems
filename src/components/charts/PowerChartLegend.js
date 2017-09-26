import React from 'react';
import ChartLegendButton from './ChartLegendButton.js';
import PropTypes from 'prop-types';
import propEq from 'ramda/src/propEq';
import prop from 'ramda/src/prop';
import './ChartLegend.scss';

PowerChartLegend.propTypes = {
  toggleLegendField: PropTypes.func.isRequired,
  structureTiles: PropTypes.array.isRequired,
  legend: PropTypes.object.isRequired
};

function PowerChartLegend (props) {
  return (
    <div className="ChartLegend__Controls">
      <div className="columns is-desktop">

        <div className="column">
          <div className="field has-addons">
            <ChartLegendButton
              handleClick={() => props.toggleLegendField('totalLoad')}
              active={props.legend.totalLoad}
              selector="totalLoad"
              text="Load"
            />

            <ChartLegendButton
              handleClick={() => props.toggleLegendField('totalGen')}
              active={props.legend.totalGen}
              selector="totalGen"
              text="Generation"
            />

            <ChartLegendButton
              handleClick={() => props.toggleLegendField('totalFeed')}
              active={props.legend.totalFeed}
              selector="totalFeed"
              text="Feed"
            />
          </div>
        </div>

        <div className="column">
          <div className="field has-addons">
          {props.structureTiles
            .filter(propEq('category', 'generator'))
            .map(s => (
              <ChartLegendButton
                key={s.id}
                handleClick={() =>props.toggleLegendField(s.id)}
                active={props.legend[s.id]}
                selector={s.tag}
                text={s.name}
              />
            ))
          }

            <ChartLegendButton
              handleClick={() => props.toggleLegendField('totalRamped')}
              active={props.legend.totalRamped}
              selector="totalRamped"
              text="Ramp"
            />
          </div>
        </div>

        <div className="column">
          <div className="field has-addons">
            {
              props.structureTiles.find(prop('buffer')) &&
              <ChartLegendButton
                handleClick={() =>props.toggleLegendField('totalBuffer')}
                active={props.legend.totalBuffer}
                selector="buffer"
                text="Buffer"
              />
            }

            {
              props.structureTiles.find(prop('storage')) &&
              <ChartLegendButton
                handleClick={() =>props.toggleLegendField('totalStorage')}
                active={props.legend.totalStorage}
                selector="storage"
                text="Storage"
              />
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default PowerChartLegend;
