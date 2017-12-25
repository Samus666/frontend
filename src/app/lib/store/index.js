import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRoutes } from "redux-first-router";
import thunkMiddleware from "redux-thunk";
import * as persistState from "redux-localstorage";

import routesMap from "./routesMap";
import * as reducers from "./reducers";

export default (history, preLoadedState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routesMap);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(thunkMiddleware, middleware);
    const enhancers = composeEnhancers(enhancer, persistState(["platform"]), middlewares);

    const store = createStore(rootReducer, preLoadedState, enhancers);

    if (module.hot && process.env.NODE_ENV === "development") {
        module.hot.accept("./reducers/index", () => {
            const reducers = require("./reducers/index");
            const rootReducer = combineReducers({ ...reducers, location: reducer });
            store.replaceReducer(rootReducer);
        });
    }

    return { store, thunk };
};
