import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./root";

const loggerMiddleware = createLogger({ rootReducer });

export default () => {
  return createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware)
  );
};
