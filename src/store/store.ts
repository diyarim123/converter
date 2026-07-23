import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // Add your slice reducers here
    // example: converter: converterSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
