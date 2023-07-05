const redux = require('redux');

// Create a reducer function
const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === "increment") {
        return {
            counter: state.counter +  1
        };
    }

    if (action.type === "decrement") {
        return {
            counter: state.counter -  1
        };
    }

    return state;
};

// Create a store
const store = redux.createStore(counterReducer);
console.log(store.getState());

// Setup Subscription
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

store.subscribe(counterSubscriber);

// Dispatch Action
store.dispatch({
    type: 'increment',
});

store.dispatch({
    type: 'decrement',
});