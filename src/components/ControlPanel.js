import React from 'react';
import PropTypes from 'prop-types';

ControlPanel.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeIdx: PropTypes.number,
  setActiveIdx: PropTypes.func.isRequired,
  activateScene: PropTypes.func.isRequired,
  deactivateScene: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired
};

function ControlPanel ({scenes, setActiveIdx, activeIdx, activateScene, deactivateScene, handleInput}) {
  let activeSystem = scenes[activeIdx];
  return (
    <div className='ControlPanel' >
      <div className='content'>
        <h3>Power Systems</h3>
        <div>
          {scenes.map((c, i) =>
            <div key={c.name}>
              <button className='button'
                onClick={() => setActiveIdx(i)}>
                {c.name}
              </button>
            </div>
          )}
        </div>

        <hr />

        {activeSystem &&
          <div>
            <div>
              <button onClick={activateScene}>
                On
              </button>
              <button onClick={deactivateScene}>
                Off
              </button>
            </div>

            <hr />

            <div>
              {activeSystem.structureTiles
                .filter(t => t.data.type == 'generator')
                .map((t, i) =>
                <div key={i}>
                  <span>{t.data.name + ' '}</span>
                  <input type="checkbox"
                    onChange={() => handleInput(i)}
                    checked={t.data.active}/>
                </div>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
}


export default ControlPanel;
