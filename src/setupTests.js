// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from './store/store';
// As a basic setup, import your same slice reducers
import taskReducer from './store/task/task.reducer'

export function renderWithStore (ui, renderOptions) {
    function Wrapper(children) {
        return <Provider store={store}>{children}</Provider>
    }

      // Return an object with the store and all of RTL's query functions
      return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
/*
export function renderWithProviders(
  ui,
  {
    preloadedState = {tasks: {}},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { task: taskReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}*/
