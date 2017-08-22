/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/activeSceneActions.js';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  sceneTogglePower: PropTypes.func.isRequired,
  toggleStructureActive: PropTypes.func.isRequired
};

function ControlPanel (props) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {props.scenes.map(s => (
            <div key={s.name}>
              <button onClick={() => props.setActiveScene(s)}>
                {s.name}
              </button>
            </div>)
          )}
        </div>

        <hr />
        {!R.isNil(props.activeScene) &&
          <div>
            <h4>Generators:</h4>
            <div>
              <button onClick={() => props.sceneTogglePower(true)}>All ON</button>
              <button onClick={() => props.sceneTogglePower(false)}>All OFF</button>
            </div>
            <div>
              {props.activeScene.structureTiles
                .filter(R.propEq('type', 'generator'))
                .map((s, i) => (
                  <div key={s.name}>
                    <span>{s.name}</span>
                    <input type="checkbox"
                      onChange={() => props.toggleStructureActive(i)}
                      checked={s.active}/>
                  </div>
                ))
              }
            </div>
          </div>
        }

      </div>
    </div>
  );
}

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
