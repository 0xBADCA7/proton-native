import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types'

class Text extends DesktopComponent {
  childName = 'text'

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiLabel();
    this.initialProps(props)
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode();
  }
}

Text.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.string
}

Text.defaultProps = {
  enabled: true,
  visible: true,
  children: ''
}

export default Text;
