import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../charts/LineChart.js';
import prop from 'ramda/src/prop';

PowerChart.propTypes = {
  structureTiles: PropTypes.array.isRequired,
  powerData: PropTypes.object.isRequired,
  scales: PropTypes.object.isRequired,
  legend: PropTypes.object.isRequired
};

function PowerChart ({powerData, structureTiles, legend, scales}) {
  return (
    <g>
      <g style={{'visibility': legend.totalGen ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalGen} tag="totalGen" value="power" {...scales}/>
      </g>

      <g style={{'visibility': legend.totalLoad ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalLoad} tag="totalLoad" value="power" {...scales}/>
      </g>

      <g style={{'visibility': legend.totalFeed ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalFeed} tag="totalFeed" value="power" {...scales}/>
      </g>

      {
        structureTiles.find(prop('buffer')) &&
        <g style={{'visibility': legend.totalBuffer ? 'visible' : 'hidden'}}>
          <LineChart data={powerData.totalBuffer} tag="buffer" value="buffer" {...scales}/>
        </g>
      }

      {
        structureTiles.find(prop('storage')) &&
        <g style={{'visibility': legend.totalStorage ? 'visible' : 'hidden'}}>
          <LineChart data={powerData.totalStorage} tag="storage" value="storage" {...scales}/>
        </g>
      }

      {structureTiles
        .filter(x => x.category == 'generator')
        .map(el =>
          <g key={el.id} style={{'visibility': legend[el.id] ? 'visible' : 'hidden'}}>
            <LineChart
              tag={el.tag}
              value="power"
              data={powerData[el.id]} {...scales}/>
          </g>
        )
      }

      <g style={{'visibility': legend.totalRamped ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalRamped} tag="totalRamped" value="power" {...scales}/>
      </g>

    </g>
  );
}


export default PowerChart;
