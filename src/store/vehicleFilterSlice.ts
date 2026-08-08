import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface VehicleFilterState {
  searchText: string
  vin: string
  make: string
  model: string
  year: string
  from_year: string
  to_year: string
  color?: string
  from_price: string
  to_price: string
}

const initialState: VehicleFilterState = {
  searchText: '',
  vin: '',
  make: '',
  model: '',
  year: '',
  from_year: '',
  to_year: '',
  color: '',
  from_price: '',
  to_price: '',
}

const vehicleFilterSlice = createSlice({
  name: 'vehicleFilter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<VehicleFilterState>>) {
      return { ...state, ...action.payload }
    },
    resetFilters() {
      return { ...initialState }
    },
  },
})

export const { setFilter, resetFilters } = vehicleFilterSlice.actions

export default vehicleFilterSlice.reducer
