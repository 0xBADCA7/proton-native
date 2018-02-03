import libui from 'libui-node';
import DesktopComponent from './DesktopComponent';

// This creates the document instance
class Root extends DesktopComponent{
	constructor() {
		super()
		libui.Ui.init()
		libui.startLoop()
	}
	render() {
		this.renderChildNode();
	}
}

export default Root;
