import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const middleware = [thunk];
const enhancers = [];

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['user', 'spot', 'request']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
);

export default function configureStore(initialState) {
    const store = createStore(persistedReducer, initialState, composedEnhancers);
    const persistor = persistStore(store);
    return { store, persistor };
}
