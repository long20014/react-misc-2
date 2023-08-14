import { types } from './types';

const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.SET_APP_CONFIG:
      return {
        ...state,
        appConfig: action.payload.appConfig,
      };
    default:
      throw new Error('invalid action');
  }
};

export default AppReducer;
