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
      <g style={{'visibility': legend.totalGeneration ? 'visible' : 'hidden'}}>
        <LineChart stroke={'black'} data={powerData.totalGen} tag="totalGen" value="power" {...scales}/>
      </g>

      <g style={{'visibility': legend.totalLoad ? 'visible' : 'hidden'}}>
        <LineChart stroke={'red'} data={powerData.totalLoad} tag="totalLoad" value="power" {...scales}/>
      </g>

      <g style={{'visibility': legend.totalRamped ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalRamped} tag="totalRamped" value="power" {...scales}/>
      </g>

      <g style={{'visibility': legend.totalFeed ? 'visible' : 'hidden'}}>
        <LineChart data={powerData.totalFeed} tag="totalFeed" value="power" {...scales}/>
      </g>

      {structureTiles
        .filter(x => x.category == 'generator')
        .map(el =>
          <g key={el.id} style={{'visibility': el.active ? 'visible' : 'hidden'}}>
            <LineChart
              tag={el.tag}
              value="power"
              data={powerData[el.id]} {...scales}/>
          </g>
        )
      }

      {structureTiles
        .filter(prop('buffer'))
        .map(el =>
          <g key={el.id} style={{'visibility': legend.buffer ? 'visible' : 'hidden'}}>
            <LineChart
              tag={"buffer"}
              value="buffer"
              data={powerData[el.id]} {...scales}/>
          </g>
        )
      }

      {structureTiles
        .filter(prop('storage'))
        .map(el =>
          <g key={el.id} style={{'visibility': legend.storage ? 'visible' : 'hidden'}}>
            <LineChart
              tag={"storage"}
              value="storage"
              data={powerData[el.id]} {...scales}/>
          </g>
        )
      }
    </g>
  );
}


export default PowerChart;
