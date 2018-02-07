import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class PasswordEntry extends DesktopComponent {
  eventParameter = { onChanged: 'text' };
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiPasswordEntry();
    this.initialProps(props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

PasswordEntry.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChanged: PropTypes.func,
  children: PropTypes.string,
  ...universalPropTypes,
};

PasswordEntry.defaultProps = {
  enabled: true,
  visible: true,
  readOnly: false,
  onChanged: () => {},
  children: '',
  ...universalDefaultProps,
};

export default PasswordEntry;
