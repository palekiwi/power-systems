/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TimelineMax } from 'gsap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from '../actions/uiActions.js';
import R from 'ramda';
import './SystemViewerModal.scss';

class SystemViewerModal extends React.Component {
  constructor (props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
    this.tl = new TimelineMax();
  }

  onEnter (node) {
    const content = node.querySelector('.graphic-modal-content');
    const background = node.querySelector('.graphic-modal-background');
    const frame = node.querySelector('.graphic-modal-frame');
    const ripple = node.querySelector('.ripple');

    this.tl
      .set(node, {display: 'block'});
    let {left, top} = frame.getBoundingClientRect();
    let [x, y] = this.props.SVModal.position;
    this.tl
      .set(ripple, {left: x - left, top: y - top})
      .to(ripple, 0.5, {transform: 'scale(50)', ease: 'Cubic.easeIn'})
      .to(background, 0.3, {opacity: 1}, "-=0.2")
      .from(content, 0.5, {y: "-=10", opacity: 0})
    ;
  }

  onExit (node) {
    let ripple = node.querySelector('.ripple');
    const background = node.querySelector('.graphic-modal-background');
    this.tl
      .to(ripple, 0.3, {transform: 'scale(0)'})
      .to(background, 0.3, {opacity: 0}, "-=0.3")
      .set(node, {display: 'none'});
  }

  render () {
    const {SVModal, activeStructure, closeSVModal} = this.props;
    return (
      <Transition in={SVModal.show}
        onEnter={this.onEnter}
        onExit={this.onExit}
        addEndListener={(node, done) => this.tl.eventCallback('onComplete', done)}
        timeout={300}>
        <div className="graphic-modal">
          <div className="graphic-modal-background" onClick={() => closeSVModal()}></div>
          <div className="graphic-modal-frame">
            <div className="ripple"/>
            <div className="graphic-modal-content">
              {activeStructure &&
                <div>
                  <h1>{activeStructure.name}</h1>
                  <div>
                    <button onClick={closeSVModal}>close</button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}

SystemViewerModal.propTypes = {
  activeStructure: PropTypes.object,
  SVModal: PropTypes.object.isRequired,
  closeSVModal: PropTypes.func.isRequired
};

const mapStateToProps = R.pick(['activeStructure', 'SVModal']);
const mapDispatchToProps = (dispatch) => bindActionCreators(uiActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SystemViewerModal);
