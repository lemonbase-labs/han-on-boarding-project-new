import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonDisplay } from '../types';
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => _useDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

type AuthState = {
  person?: PersonDisplay;
};

const initialState: AuthState = { person: undefined };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<PersonDisplay>) => {
      state = { person: payload };
    },
    logout: (state) => {
      state = { person: undefined };
    },
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { login: loginAction, logout: logoutAction } = authSlice.actions;

export const selectPerson = (state: RootState) => state.auth.person;
