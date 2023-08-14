import React, { createContext, useReducer } from 'react';
import AppReducer from './reducer';
import { AppState } from 'types/common';

const initialState: AppState = { appConfig: { commentMaxDepth: 2 } };

export const AppContext = createContext<any>(initialState);

export const AppStateProvider: React.FC<any> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
