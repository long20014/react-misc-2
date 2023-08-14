import { AppConfig } from 'types/common';
import { types } from './types';

export const setAppConfig = (appConfig: AppConfig) => {
  return {
    type: types.SET_APP_CONFIG,
    payload: {
      appConfig,
    },
  };
};
