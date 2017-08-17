/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { TimelineMax } from 'gsap';
import './SystemViewerModal.scss';

class GraphicModal extends React.Component {
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
    let [x, y] = this.props.position;
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

  end (done) {
    console.log(done);
    return done();
  }

  render () {
    const {closeModal, showModal, content} = this.props;
    return (
      <Transition in={showModal}
        onEnter={this.onEnter}
        onExit={this.onExit}
        addEndListener={(node, done) => this.tl.eventCallback('onComplete', done)}
        timeout={300}>
        <div className="graphic-modal">
          <div className="graphic-modal-background" onClick={() => closeModal()}></div>
          <div className="graphic-modal-frame">
            <div className="ripple"/>
            <div className="graphic-modal-content">
              {content &&
                <div>
                  <h1>{content.data.name}</h1>
                  <div>
                    <button onClick={closeModal}>close</button>
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

GraphicModal.propTypes = {
  content: PropTypes.object,
  position: PropTypes.array,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
};

export default GraphicModal;
