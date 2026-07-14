import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add your slice reducers here
    // example: converter: converterSlice.reducer,
  },
})

/** @typedef {ReturnType<typeof store.getState>} RootState */
/** @typedef {typeof store.dispatch} AppDispatch */
