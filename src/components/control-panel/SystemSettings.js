import React from 'react';
import PropTypes from 'prop-types';

SystemSetting.propTypes = {
  setGridSize: PropTypes.func.isRequired,
  setSceneName: PropTypes.func.isRequired,
  saveScene: PropTypes.func.isRequired,
  setStructureCapacity: PropTypes.func.isRequired,
  activeScene: PropTypes.object.isRequired
};

function SystemSetting ({setGridSize, setSceneName, activeScene, setStructureCapacity, saveScene}) {
  return (
    <div>
      <h4>Settings</h4>
      <div>
        <h5>Name</h5>
        <input className="input" type="text"
          onChange={(e) => setSceneName(e.target.value)}
          value={activeScene.name}
        />
      </div>

      <hr />

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
          <div key={t.name + i} style={{display: (t.class == 'generator') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>
              <input type="range"
                value={t.capacity}
                min="0"
                max={t.max}
                step="5"
                onChange={(e) => setStructureCapacity(i, e.target.value)}
              />
              <span>{t.capacity}kW</span>
            </div>
          </div>
        )}
      </div>

      <hr/>

      <div>
        <h5>Load</h5>
        {activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.class == 'consumer') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>
              <input type="range"
                value={t.capacity}
                min="0"
                max={t.max}
                step="5"
                onChange={(e) => setStructureCapacity(i,e.target.value)}
              />
              <span>{t.capacity}kW</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <button onClick={() => saveScene(activeScene)}>Save</button>
      </div>
    </div>
  );
}


export default SystemSetting;
