import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../charts/LineChart.js';

BatteryChart.propTypes = {
  structureTiles: PropTypes.array.isRequired,
  powerData: PropTypes.object.isRequired,
  scales: PropTypes.object.isRequired,
  legend: PropTypes.object.isRequired
};

function BatteryChart ({powerData, structureTiles, legend, scales}) {
  return (
    <g>
      {structureTiles
        .filter(x => x.category == 'battery')
        .map(el =>
          <g key={el.id} style={{'visibility': legend[el.id] ? 'visible' : 'hidden'}}>
            <LineChart
              tag={el.buffer ? 'buffer' : 'storage'}
              value="soc"
              data={powerData[el.id]} {...scales}/>
          </g>
        )
      }
    </g>
  );
}


export default BatteryChart;
