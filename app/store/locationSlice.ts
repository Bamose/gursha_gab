import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  errorMsg: string;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  errorMsg: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationData: (state, action: PayloadAction<{ latitude: number, longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.errorMsg = '';
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const { setLocationData, setErrorMsg } = locationSlice.actions;
export default locationSlice.reducer;
