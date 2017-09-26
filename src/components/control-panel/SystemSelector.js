import React from 'react';
import PropTypes from 'prop-types';
import scene2d from '../../lib/scene-2d.js';

SystemSelector.propTypes = {
  scenes: PropTypes.array.isRequired,
  activeScene: PropTypes.object,
  setActiveScene: PropTypes.func.isRequired,
  createNewScene: PropTypes.func.isRequired,
  saveNewScene: PropTypes.func.isRequired,
  updateScene: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  editScene: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

function SystemSelector (props) {
  return (
    <nav className="panel" style={{background: 'white'}}>
      <p className="panel-heading">
        Power Systems
      </p>
      <div className="panel-block">
        {
          props.editor ?
          <div className="field has-addons">
            <p className="control">
              <a className="button is-primary is-outlined"
                onClick={() => props.activeScene.id ? props.updateScene(props.activeScene) : props.saveNewScene(scene2d(props.activeScene))}
              >
                <span className="icon is-small">
                  <i className="fa fa-floppy-o"></i>
                </span>
                <span>Save</span>
              </a>
            </p>
            <p className="control">
              <a className="button is-primary is-outlined"
                onClick={props.closeEditor}
              >
                <span className="icon is-small">
                  <i className="fa fa-chevron-left"></i>
                </span>
                <span>Back</span>
              </a>
            </p>
          </div>
          :
          <div className="field has-addons">
            <p className="control">
              <a className="button is-primary is-outlined"
                onClick={props.createNewScene}
              >
                <span className="icon is-small">
                  <i className="fa fa-plus"></i>
                </span>
                <span>New</span>
              </a>
            </p>
            <p className="control">
              <a className="button is-primary is-outlined"
                onClick={props.editScene}
              >
                <span className="icon is-small">
                  <i className="fa fa-edit"></i>
                </span>
                <span>Edit</span>
              </a>
            </p>
          </div>
        }
      </div>
      {props.scenes.map(s => (
        <a className={"panel-block" + (props.activeScene && s.id == props.activeScene.id ? ' is-active' : '')}
          key={s.id}
          onClick={() => props.setActiveScene(s)}>
          <span className="panel-icon">
            <i className={"fa" + (props.activeScene && s.id == props.activeScene.id ? ' fa-dot-circle-o' : ' fa-circle-o')}></i>
          </span>
          {s.name}
        </a>
        )
      )}
    </nav>
  );
}

export default SystemSelector;
