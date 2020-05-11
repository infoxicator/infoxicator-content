import { combineReducers } from 'redux-immutable';
import { proceduresReducer } from 'iguazu-rpc';

export default combineReducers({
  procedures: proceduresReducer,
});
