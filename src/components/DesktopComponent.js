import { Tab, Form, Grid, Combobox, RadioButton, EditableCombobox } from './';
import PropTypes from 'prop-types';

class DesktopComponent {
  constructor(root, props) {
    this.children = [];
  }

  setDefaults(props) {
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props)) {
        this.props[prop] = this.constructor.defaultProps[prop];
      }
    }
    PropTypes.checkPropTypes(
      this.constructor.PropTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }

  exists(a) {
    return typeof a !== 'undefined';
  }

  appendChild(child) {
    // add a child to the list to be rendered
    this.children.push(child);
  }

  removeChild(child) {
    // remove it, and destroy it
    if (this.exists(this.element.setChild)) {
      // if it can only have one child, we don't need to "de-render" it
    } else if (this.exists(this.element.deleteAt)) {
      // if it can have multiple ex. VerticalBox
      this.element.deleteAt(this.children.indexOf(child));
      child.element.destroy();
    }
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  renderChildNode(parent) {
    // render the children
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render(parent);
      }
    }
  }

  addParentAppend(parent) {
    // append to parent. Can be overriden
    const stretchy = this.props.stretchy;
    if (parent instanceof Form) {
      // we have a form
      parent.element.append(this.props.label, this.element, stretchy);
    } else if (parent instanceof Tab) {
      // we have a tab
      parent.element.append(this.props.label, this.element);
      const index = parent.children.indexOf(this);
      const margined = this.props.margined;
      parent.element.setMargined(index, margined);
    } else if (parent instanceof Grid) {
      parent.element.append(
        this.element,
        this.props.column,
        this.props.row,
        this.props.span.x,
        this.props.span.y,
        this.props.expand.h,
        this.props.align.h,
        this.props.expand.v,
        this.props.align.v
      );
    } else if (
      parent instanceof Combobox ||
      parent instanceof RadioButton ||
      parent instanceof EditableCombobox
    ) {
      // we assume we are a ComboBox.Item, and just append the child
      parent.element.append(this.props.children);
    } else {
      parent.element.append(this.element, stretchy);
    }
  }

  addParent(parent) {
    // add itself to the parent
    if (this.exists(parent.element.setChild)) {
      parent.element.setChild(this.element);
    } else if (this.exists(parent.element.append)) {
      this.addParentAppend(parent); // append itself to the parent
    }
  }

  update(oldProps, newProps) {
    // update all things, split into props, events, and children
    for (let prop in newProps) {
      // normal props
      if (oldProps[prop] !== newProps[prop]) {
        if (typeof newProps[prop] === 'function') {
          if (this.eventParameter[prop] !== '') {
            this.element[prop](() =>
              newProps[prop](this.element[this.eventParameter[prop]])
            );
          } else {
            this.element[prop](newProps[prop]);
          }
        } else if (prop == 'children') {
          if (this.exists(this.childName)) {
            // prevent stray children from crashing program (like App component)
            this.element[this.childName] = newProps[prop];
          }
        } else {
          if (prop !== 'selected') {
            this.element[prop] = newProps[prop];
          }
        }
      }
    }
  }

  initialProps(props) {
    // same, but don't check for oldProps vs newProps, just set them
    for (let prop in props) {
      // normal props
      if (typeof props[prop] === 'function') {
        if (this.eventParameter[prop] !== '') {
          this.element[prop](() =>
            props[prop](this.element[this.eventParameter[prop]])
          );
        } else {
          this.element[prop](props[prop]);
        }
      } else if (prop == 'children') {
        if (this.exists(this.childName)) {
          // prevent stray children from crashing program (like App component)
          this.element[this.childName] = props[prop];
        }
      } else {
        if (prop !== 'selected') {
          this.element[prop] = props[prop];
        }
      }
    }
  }
}

export const universalPropTypes = {
  stretchy: PropTypes.bool,
  label: PropTypes.string,
  column: PropTypes.number,
  row: PropTypes.number,
  span: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  expand: PropTypes.shape({
    h: PropTypes.bool,
    v: PropTypes.bool,
  }),
  align: PropTypes.shape({
    h: PropTypes.bool,
    v: PropTypes.bool,
  }),
};

export const universalDefaultProps = {
  stretchy: true,
  label: '',
  column: 0,
  row: 0,
  span: {
    x: 1,
    y: 1,
  },
  expand: {
    h: true,
    v: true,
  },
  align: {
    h: true,
    v: true,
  },
};

export default DesktopComponent;
