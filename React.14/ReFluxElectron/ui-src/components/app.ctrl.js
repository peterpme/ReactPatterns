import React, {Component} from 'react';

import BasicStore from './../flux/Basic.Store';

let AppCtrlSty = {
	height: '100%',
	padding: '0 10px 0 0'
}

class AppCtrlRender extends Component {
 	render() {
		let data = JSON.stringify(this.state.treeData, null, 2);
		return (
			<div id='AppCtrlSty' style={AppCtrlSty}>
				React 1.4 ReFlux and Electron<br/><br/>
				Data: {data}
			</div>
		);
	}
}

function getState() { return {treeData: BasicStore.getData()}; };

export default class AppCtrl extends AppCtrlRender {
	constructor() {
	  super();
		this.state = getState();
	}

	componentDidMount = () => { this.unsubscribe = BasicStore.listen(this.storeDidChange); }
	componentWillUnmount = () => { this.unsubscribe(); }
	storeDidChange = () => { this.setState(getState()); }
}
