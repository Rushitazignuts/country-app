import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setLoadingSpinner } from './shared.action';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  })
);

export function sharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
