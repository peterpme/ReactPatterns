import Reflux from 'reflux';

var apiActions = [
	'apiInit',
	'apiInitDone',
	'apiGetData',
	'apiSetData'
]

var ipcActions = ['gotData']

var actionArray = [...apiActions, ...ipcActions];
module.exports = Reflux.createActions(actionArray);
