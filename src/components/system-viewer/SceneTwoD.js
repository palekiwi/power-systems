import React from 'react';
import PropTypes from 'prop-types';

SceneTwoD.propTypes = {
  scene: PropTypes.object.isRequired
};

function SceneTwoD ({scene}) {
  return (
    <div>{scene.name}</div>
  );
}


export default SceneTwoD;
