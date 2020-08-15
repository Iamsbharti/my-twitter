import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import rootReducers from "./reducers";
import thunk from "redux-thunk";

export default function configureStore() {
  //add support for chrome redux-dev-tools
  const composeEnhancers =
    (typeof window !== undefined &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  return createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
