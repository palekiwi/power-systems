import React from 'react';
import PropTypes from 'prop-types';

SystemSetting.propTypes = {
  setGridSize: PropTypes.func.isRequired,
  activeScene: PropTypes.object.isRequired
};

function SystemSetting ({setGridSize, activeScene}) {
  return (
    <div>
      <h4>Settings</h4>
      <div>
        <h5>Grid Size</h5>
        <button onClick={() => setGridSize([3,3])}>S</button>
        <button onClick={() => setGridSize([4,4])}>M</button>
        <button onClick={() => setGridSize([5,5])}>L</button>
      </div>

      <hr />

      <div>
        <h5>Generators</h5>
        {activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.type == 'generator') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>
              <input type="range" value={t.capacity}/>
            </div>
            <div>{t.capacity}</div>
          </div>
        )}
      </div>

      <hr/>

      <div>
        <h5>Consumers</h5>
        {activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.type == 'consumer') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>{t.capacity}</div>
          </div>
        )}
      </div>
    </div>
  );
}


export default SystemSetting;
