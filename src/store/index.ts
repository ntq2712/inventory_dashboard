import { configureStore } from '@reduxjs/toolkit'
import vehicleFilterReducer from './vehicleFilterSlice'

export const store = configureStore({
  reducer: {
    vehicleFilter: vehicleFilterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
