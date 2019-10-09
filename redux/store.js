import reducer from './reducer/reducer';
import { createStore } from 'redux';
import { persistStore,persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    blacklist:['filterDisplay']
   };
const pReducer = persistReducer(persistConfig, reducer);

export default store = createStore(pReducer);
export const persistor = persistStore(store);
