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
  sceneTogglePower: PropTypes.func.isRequired
};

function ControlPanel ({scenes, activeScene, setActiveScene, sceneTogglePower}) {
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {scenes.map(s => (
            <div key={s.name}>
              <button onClick={() => setActiveScene(s)}>
                {s.name}
              </button>
            </div>)
          )}
        </div>

        <hr />

        <div>
          <h4>Settings:</h4>
          <div>
            <button onClick={() => sceneTogglePower(true)}>ON</button>
            <button onClick={() => sceneTogglePower(false)}>OFF</button>
          </div>
        </div>
        <div>
          <h4>Generators:</h4>
          <div>
            {!R.isNil(activeScene) && activeScene.structureTiles
              .filter(R.propEq('type', 'generator'))
              .map(s => (
                <div key={s.name}>
                  <span>{s.name}</span>
                  <input type="checkbox"/>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = R.pick(['scenes', 'activeScene']);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
