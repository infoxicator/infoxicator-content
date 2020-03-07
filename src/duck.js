import {
  fromJS,
} from 'immutable';

export const REQUEST = 'modules/infoxicator-main/REQUEST';
export const SUCCESS = 'modules/infoxicator-main/SUCCESS';
export const FAILURE = 'modules/infoxicator-main/FAILURE';

function buildInitialState() {
  return fromJS({
    isLoading: false,
    isComplete: false,
    data: null,
    error: null,
  });
}

function reducer(state = buildInitialState(), action) {
  switch (action.type) {
    case REQUEST:
      return state
        .set('isLoading', true)
        .set('isComplete', false);
    case SUCCESS:
      return state
        .set('data', action.data)
        .set('isLoading', false)
        .set('isComplete', true);
    case FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false)
        .set('isComplete', true);
    default:
      return state;
  }
}

export default reducer;
