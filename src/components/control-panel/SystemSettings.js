import React from 'react';
import PropTypes from 'prop-types';
import scene2d from '../../lib/scene-2d.js';
import {computeSystemOutput} from '../../lib/power-system.js';
import evolve from 'ramda/src/evolve';
import propEq from 'ramda/src/propEq';
import isNil from 'ramda/src/isNil';
import powerData from '../../data/power/index.js';

SystemSetting.propTypes = {
  setGridSize: PropTypes.func.isRequired,
  setSceneName: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  setStructureCapacity: PropTypes.func.isRequired,
  setStructureRamp: PropTypes.func.isRequired,
  setStructureBase: PropTypes.func.isRequired,
  activeScene: PropTypes.object.isRequired
};

function SystemSetting (props) {
  const battery = props.activeScene.structureTiles.find(propEq('category', 'battery'));
  return (
    <div>
      <h4>Settings</h4>
      <div>
        { props.activeScene.id  ?
          <div>
            <button onClick={() => props.updateScene(evolve({'structureTiles': computeSystemOutput(powerData)}, props.activeScene))}>Update</button>
            <button onClick={() => props.closeEditor()}>Cancel</button>
          </div>
          :
          <div>
            <button onClick={() => props.saveNewScene(evolve({'structureTiles': computeSystemOutput(powerData)}, scene2d(props.activeScene)))}>Save</button>
            <button onClick={() => props.closeEditor()}>Cancel</button>
          </div>
        }
      </div>
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
          <div key={t.name + i} style={{display: (t.category == 'generator') ? 'auto' : 'none'}}>
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
            {
              !isNil(t.ramp) &&
              <div>
                <div>
                  <span>Ramp: </span>
                  <input type="number"
                    style={{width: '30%'}}
                    min="0"
                    max="100"
                    step="1"
                    value={Math.floor(t.ramp * 100)}
                    onChange={(e) => props.setStructureRamp(i, (e.target.value == 0) ? 0 : e.target.value / 100)}
                  />
                  <span>%/5min</span>
                </div>
              </div>
            }
            {
              !isNil(t.base) &&
              <div>
                <div>
                  <span>Base: </span>
                  <input type="number"
                    style={{width: '30%'}}
                    min="0"
                    max="100"
                    step="1"
                    value={Math.floor(t.base * 100)}
                    onChange={(e) => props.setStructureBase(i, (e.target.value == 0) ? 0 : e.target.value / 100)}
                  />
                  <span>%</span>
                </div>
              </div>
            }
            {
              t.type != 'variable' &&
              <div>
                <span>Type</span>
                <select
                  value={t.type}
                  onChange={(e) => props.setStructureType(i, e.target.value)}
                >
                  <option value="base">Base</option>
                  <option value="backup">Backup</option>
                </select>
              </div>
            }
          <hr/>
          </div>
        )}
      </div>

      <div>
        <h5>Load</h5>
        {props.activeScene.structureTiles.map((t,i) =>
          <div key={t.name + i} style={{display: (t.category == 'consumer') ? 'auto' : 'none'}}>
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
    </div>
  );
}

export default SystemSetting;
