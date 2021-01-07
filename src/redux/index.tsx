import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from './rootReducer';

const composeDev =
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        ? compose(
            applyMiddleware(thunk),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )
        : compose(
            applyMiddleware(thunk)
        );

const store = createStore(reducer, composeDev)

export default store