import Reflux from 'reflux';

import Actions from './Actions';
import ApiFct from './../utils/ws.api.js';

let ApiStoreObject = {
	listenables: Actions,
	apiInit() { ApiFct.init(); },
	apiInitDone() { ApiFct.getData(); },
	apiSetData(data) { ApiFct.setData(data); }
}
const ApiStore = Reflux.createStore(ApiStoreObject);
export default ApiStore;
