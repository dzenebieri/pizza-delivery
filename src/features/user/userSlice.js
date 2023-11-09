import { getGeolocation } from '../../services/apiGeocoding';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress',
  async function () {
    const locationObj = await getLocation();
    const location = {
      latitude: locationObj.coords.latitude,
      longitude: locationObj.coords.longitude,
    };

    const addressObj = await getGeolocation(location);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { location, address };
  }
);

const initialState = {
  username: '',
  status: 'idle',
  location: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { updateName(state, action) { state.username = action.payload; }, },
  extraReducers: (builder) => builder
    .addCase(fetchAddress.pending, (state, _action) => {
      state.status = 'loading';
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      state.location = action.payload.location;
      state.address = action.payload.address;
      state.status = 'idle';
    })
    .addCase(fetchAddress.rejected, (state, _action) => {
      state.status = 'error';
      state.error = 'There was a problem getting your address. Make sure to fill this field!';
    }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
