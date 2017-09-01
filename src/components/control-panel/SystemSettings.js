import React from 'react';
import PropTypes from 'prop-types';
import scene2d from '../../lib/scene-2d.js';
import {computeSystemOutput} from '../../lib/power-system.js';
import evolve from 'ramda/src/evolve';

SystemSetting.propTypes = {
  setGridSize: PropTypes.func.isRequired,
  setSceneName: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  setStructureCapacity: PropTypes.func.isRequired,
  activeScene: PropTypes.object.isRequired
};

function SystemSetting (props) {
  return (
    <div>
      <h4>Settings</h4>
      <div>
        <h5>Name</h5>
        <input className="input" type="text"
          onChange={(e) => props.setSceneName(e.target.value)}
          value={props.activeScene.name}
        />
      </div>

      <hr />

      <div>
        <h5>Grid Size</h5>
        <button onClick={() => props.setGridSize([3,3])}>S</button>
        <button onClick={() => props.setGridSize([4,4])}>M</button>
        <button onClick={() => props.setGridSize([5,5])}>L</button>
      </div>

      <hr />

      <div>
        <h5>Generators</h5>
        {props.activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.class == 'generator') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>
              <input type="range"
                value={t.capacity}
                min="0"
                max={t.max}
                step="5"
                onChange={(e) => props.setStructureCapacity(i, e.target.value)}
              />
              <span>{t.capacity}kW</span>
            </div>
          </div>
        )}
      </div>

      <hr/>

      <div>
        <h5>Load</h5>
        {props.activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.class == 'consumer') ? 'auto' : 'none'}}>
            <div>{t.name}</div>
            <div>
              <input type="range"
                value={t.capacity}
                min="0"
                max={t.max}
                step="5"
                onChange={(e) => props.setStructureCapacity(i,e.target.value)}
              />
              <span>{t.capacity}kW</span>
            </div>
          </div>
        )}
      </div>
      <div>
        { props.activeScene.id  ?
          <button onClick={() => props.updateScene(props.activeScene)}>Update</button>
          :
          <button onClick={() => props.saveNewScene(evolve({'structureTiles': computeSystemOutput}, scene2d(props.activeScene)))}>Save</button>
        }
        <button onClick={() => props.closeEditor()}>Cancel</button>
      </div>
    </div>
  );
}

export default SystemSetting;
