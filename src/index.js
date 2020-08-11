import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

// when your backend is deployed, here is where you put the API prefix
const DEV_API_PREFIX = "<YOUR_API_PREFIX_GOES_HERE>";
const initialState = {};
const { persistor, store } = configureStore(initialState);

axios.interceptors.request.use(
    function (config) {
        config.url = DEV_API_PREFIX + config.url;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
