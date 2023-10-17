import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},  // Example: { "USA": { "California": ["Los Angeles", "San Diego"] } }
  selectedStates: [],
  selectedCities: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setJsonData: (state, action) => {
      state.data = action.payload;
    },

    toggleState: (state, action) => {
      const { stateName } = action.payload;
      const index = state.selectedStates.indexOf(stateName);

      // If the state is already selected, remove it and its cities from the selected lists
      if (index >= 0) {
        state.selectedStates.splice(index, 1);
        const citiesInState = state.data[stateName];
        state.selectedCities = state.selectedCities.filter(city => !citiesInState.includes(city));
      } 
      // If the state is not selected, add it and its cities to the selected lists
      else {
        state.selectedStates.push(stateName);
        state.selectedCities = [...state.selectedCities, ...state.data[stateName]];
      }
    },

    toggleCity: (state, action) => {
      const { stateName, cityName } = action.payload;
      const index = state.selectedCities.indexOf(cityName);

      if (index >= 0) {
        state.selectedCities.splice(index, 1);
      } else {
        state.selectedCities.push(cityName);
      }

      // If all the cities of a state are selected, select the state as well
      const allCitiesOfState = state.data[stateName];
      const allCitiesSelected = allCitiesOfState.every(city => state.selectedCities.includes(city));
      if (allCitiesSelected && !state.selectedStates.includes(stateName)) {
        state.selectedStates.push(stateName);
      } 
      // If any city of a state is deselected, deselect the state as well
      else if (!allCitiesSelected && state.selectedStates.includes(stateName)) {
        const stateIndex = state.selectedStates.indexOf(stateName);
        state.selectedStates.splice(stateIndex, 1);
      }
    },
  },
});

export const { setJsonData, toggleState, toggleCity } = locationSlice.actions;

export default locationSlice.reducer;
