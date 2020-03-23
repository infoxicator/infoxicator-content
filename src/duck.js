import { combineReducers } from 'redux-immutable';
import { resourcesReducer } from 'iguazu-rest';
import { proceduresReducer } from 'iguazu-rpc';

export default combineReducers({
  resources: resourcesReducer,
  procedures: proceduresReducer,
});
