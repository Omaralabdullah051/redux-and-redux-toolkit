const { createSlice } = require("@reduxjs/toolkit");
const { counterActions } = require("../counter/counterSlice");

const initialState = {
  count: 5,
};

const dynamicCounterSlice = createSlice({
  name: "dynamicCounter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    },
  },
  //   statically
  //   extraReducers: {
  //     ["counter/increment"]: (state, action) => {
  //       state.count += 1;
  //     },
  //   },
  //   dynamically
  extraReducers: (builder) => {
    builder.addCase(counterActions.increment, (state, action) => {
      state.count += 1;
    });
  },
});

module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;
