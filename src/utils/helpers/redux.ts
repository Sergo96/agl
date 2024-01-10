export const combineReducers = (state: any, action: any, ...reducers: Array<any>) => {
  for (const reducer of reducers) state = reducer(state, action);
  return state;
};
