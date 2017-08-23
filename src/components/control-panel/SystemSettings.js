import React from 'react';
import PropTypes from 'prop-types';

SystemSetting.propTypes = {
  setGridSize: PropTypes.func.isRequired
};

function SystemSetting (props) {
  return (
    <div>
      <h4>Settings</h4>
      <div>Grid Size</div>
      <button onClick={() => props.setGridSize([3,3])}>S</button>
      <button onClick={() => props.setGridSize([4,4])}>M</button>
      <button onClick={() => props.setGridSize([5,5])}>L</button>
    </div>
  );
}


export default SystemSetting;
