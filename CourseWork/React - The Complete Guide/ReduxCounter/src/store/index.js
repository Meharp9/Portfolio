import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
        showCounter: true,
    },
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }

    }
});

const AutheSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }

    }
});

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: AutheSlice.reducer
    } //Expected property by Configure Store
    //reducer: {counter: counterSlice.reducer} # Reducer mapping can be passed
});

export const counterActions = counterSlice.actions;
export const authActions = AutheSlice.actions;

export default store;