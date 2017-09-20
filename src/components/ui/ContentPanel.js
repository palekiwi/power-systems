import React from 'react';
import PropTypes from 'prop-types';

ContentPanel.propTypes = {
  item: PropTypes.object.isRequired,
  pos: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  split: PropTypes.string,
  children: PropTypes.object,
  components: PropTypes.array.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  setPaneContent: PropTypes.func.isRequired,
  setSplit: PropTypes.func.isRequired,
  addPane: PropTypes.func.isRequired,
  closePane: PropTypes.func.isRequired
};

function ContentPanel (props) {
  let p = props.item;
  let i = props.index;
  return (
    <div className="ContentPanel">
      <div className="Content">

        <div className="Content__Header">
          <div className={"dropdown " + (p.dropdown ? "is-active" : "")}>
            <div className="dropdown-trigger">
              <button className="button is-small" onClick={() => props.toggleDropdown(props.pos, i)}>
                <span>{p.content}</span>
                <span className="icon is-small">
                  <i className="fa fa-angle-down"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {props.components.map(c =>
                  <a key={c} className="dropdown-item" onClick={() => props.setPaneContent('top', i, c)}>
                    {c}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="field has-addons is-pulled-right">
            <div className="control">
              <a className="button is-small" onClick={() => this.props('top', 'horizontal')}>
                <span className="icon is-small">
                  <i className="fa fa-pause" style={{transform: "rotate(90deg)"}}></i>
                </span>
              </a>
            </div>
            <div className="control">
              <a className="button is-small" onClick={() => props.setSplit('top', 'vertical')}>
                <span className="icon is-small">
                  <i className="fa fa-pause"></i>
                </span>
              </a>
            </div>
            <div className="control">
              <a className="button is-small" onClick={() => props.addPane(props.pos)}>
                <span className="icon is-small">
                  <i className="fa fa-plus"></i>
                </span>
              </a>
            </div>
            <div className="control">
              <a className="button is-small" onClick={() => props.closePane(props.pos, i)}>
                <span className="icon is-small">
                  <i className="fa fa-times"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}


export default ContentPanel;
