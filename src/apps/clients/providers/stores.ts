import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './services'
 
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['steperReservation'], // which reducer want to store,
  blacklist : ['tmpData']
};

const pReducer = persistReducer<any,any>(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };