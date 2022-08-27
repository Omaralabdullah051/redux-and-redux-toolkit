const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");

const { increment, decrement } = counterActions;

// initial state
console.log(`Initial State: ${JSON.stringify(store.getState())}`);

// subscribe to state changes
store.subscribe(() => {
  console.log(store.getState());
});

// disptach actions
store.dispatch(increment());

store.dispatch(increment());

store.dispatch(decrement());
