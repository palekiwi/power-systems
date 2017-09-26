import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activeSceneActions from '../actions/activeSceneActions.js';
import * as editorActions from '../actions/editorActions.js';
import pick from 'ramda/src/pick';
import mergeAll from 'ramda/src/mergeAll';
import isNil from 'ramda/src/isNil';
import './SystemSettings.scss';

const actions = mergeAll([activeSceneActions, editorActions]);

SystemSettings.propTypes = {
  setGridSize: PropTypes.func.isRequired,
  setSceneName: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  setStructureCapacity: PropTypes.func.isRequired,
  setStructureRamp: PropTypes.func.isRequired,
  setStructureBase: PropTypes.func.isRequired,
  setStructureType: PropTypes.func.isRequired,
  setBatteryC: PropTypes.func.isRequired,
  setBatteryBuffer: PropTypes.func.isRequired,
  setBatteryStorage: PropTypes.func.isRequired,
  activeScene: PropTypes.object,
  editor: PropTypes.bool.isRequired
};

function SystemSettings (props) {
  let disabled = !props.editor;
  return (
    <div className="SystemSettings">
      {
        !props.activeScene ?
        <div>Nothing</div>
        :
        <div className="SystemSettings__Content">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                System Name
              </div>
            </div>

            <div className="card-content">
              <input className="input" type="text" disabled={disabled}
                onChange={(e) => props.setSceneName(e.target.value)}
                value={props.activeScene.name}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Grid Size
              </div>
            </div>
            <div className="card-content">
              <div className="field has-addons">
                <p className="control">
                  <a className={gridButton(props, [3,3])}
                    onClick={() => props.setGridSize([3,3])}
                    disabled={disabled}
                  >
                    <span>S</span>
                  </a>
                </p>
                <p className="control">
                  <a className={gridButton(props, [4,4])}
                    onClick={() => props.setGridSize([4,4])}
                    disabled={disabled}
                  >
                    <span>M</span>
                  </a>
                </p>
                <p className="control">
                  <a className={gridButton(props, [5,5])}
                    onClick={() => props.setGridSize([5,5])}
                    disabled={disabled}
                  >
                    <span>L</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Generators
              </div>
            </div>
            <div className="card-content">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>Ramp</th>
                    <th>Base</th>
                  </tr>
                </thead>
                <tbody>
                {props.activeScene.structureTiles.map((t,i) =>
                  <tr key={t.name + i} style={{display: (t.category == 'generator') ? 'auto' : 'none'}}>
                    <td>{t.name}</td>
                    <td>
                      <div className="field" style={{display: (t.type == 'variable') ? 'none' : 'auto'}}>
                        <div className="select">
                          <select
                            disabled={disabled}
                            value={t.type}
                            onChange={(e) => props.setStructureType(i, e.target.value)}
                          >
                            <option value="base">Base</option>
                            <option value="backup">Backup</option>
                          </select>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            disabled={disabled}
                            type="number"
                            value={t.capacity}
                            min="0"
                            max={t.max}
                            step="5"
                            onChange={(e) => props.setStructureCapacity(i, e.target.value)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            kW
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons" style={{display: (t.type == 'variable') ? 'none' : 'auto'}}>
                        <p className="control">
                          <input
                            type="number"
                            className="input"
                            disabled={disabled}
                            min="0"
                            max="100"
                            step="1"
                            value={Math.floor(t.ramp * 100)}
                            onChange={(e) => props.setStructureRamp(i, (e.target.value == 0) ? 0 : e.target.value / 100)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            %/5min
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons" style={{display: (t.type == 'variable') ? 'none' : 'auto'}}>
                        <p className="control">
                          <input
                            className="input"
                            type="number"
                            disabled={disabled}
                            min="0"
                            max="100"
                            step="5"
                            value={Math.floor(t.base * 100)}
                            onChange={(e) => props.setStructureBase(i, (e.target.value == 0) ? 0 : e.target.value / 100)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            %
                          </a>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Batteries
              </div>
            </div>
            <div className="card-content">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>C-Rating</th>
                    <th>Ramp</th>
                  </tr>
                </thead>
                <tbody>
                {props.activeScene.structureTiles.map((t,i) =>
                  <tr key={t.name + i} style={{display: (t.category == 'battery') ? 'auto' : 'none'}}>
                    <td>{t.name}</td>
                    <td>
                      <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input
                              disabled={disabled}
                              type="checkbox"
                              checked={t.buffer}
                              onChange={() => props.setBatteryBuffer(i)}
                            />
                            Buffer
                          </label>
                          <label className="checkbox">
                            <input
                              disabled={disabled}
                              className="checkbox"
                              type="checkbox"
                              checked={t.storage}
                              onChange={() => props.setBatteryStorage(i)}
                            />
                            Storage
                          </label>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            disabled={disabled}
                            type="number"
                            value={t.capacity}
                            min="0"
                            max={t.max}
                            step="5"
                            onChange={(e) => props.setStructureCapacity(i,e.target.value)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            kWh
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            disabled={disabled}
                            type="number"
                            min="0"
                            max="5"
                            step="1"
                            value={t.c}
                            onChange={(e) => props.setBatteryC(i, e.target.value)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            C
                          </a>
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            disabled={!t.buffer || disabled}
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            value={Math.floor(t.ramp * 100)}
                            onChange={(e) => props.setStructureRamp(i, (e.target.value == 0) ? 0 : e.target.value / 100)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            %/5min
                          </a>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Load
              </div>
            </div>
            <div className="card-content">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                <tbody>
                {props.activeScene.structureTiles.map((t,i) =>
                  <tr key={t.name + i} style={{display: (t.category == 'consumer') ? 'auto' : 'none'}}>
                    <td>{t.name}</td>
                    <td>
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input"
                            disabled={disabled}
                            type="number"
                            value={t.capacity}
                            min="0"
                            max={t.max}
                            step="5"
                            onChange={(e) => props.setStructureCapacity(i,e.target.value)}
                          />
                        </p>
                        <p className="control">
                          <a className="button is-static">
                            kW
                          </a>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = pick(['activeScene', 'powerData', 'editor']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemSettings);

function gridButton (props, arr) {
  return "button is-primary" + (props.activeScene.gridSize.toString() == arr.toString() ? "" : " is-outlined");
}
