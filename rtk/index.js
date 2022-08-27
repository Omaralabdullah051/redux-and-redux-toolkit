const store = require("./app/store");
const { counterActions } = require("./features/counter/counterSlice");
const {
  dynamicCounterActions,
} = require("./features/dynamicCounter/dynamicCounterSlice");

const { increment, decrement } = counterActions;
const { increment: dynamicIncrement, decrement: dynamicDecrement } =
  dynamicCounterActions;

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

store.dispatch(dynamicIncrement(5));

store.dispatch(dynamicIncrement(4));

store.dispatch(dynamicDecrement(2));
