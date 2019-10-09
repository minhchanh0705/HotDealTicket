import {combineReducers} from 'redux';
import bannerReducer from './bannerReducer';
import categoriesReducer from './categoriesReducer';
import detailIdReducer from './detailIdReducer';
import detailReducer from './detailReducer';
import eventsReducer from './eventsReducer';
const reducer = combineReducers({
    banner:bannerReducer,
    categories:categoriesReducer,
    detailId:detailIdReducer,
    detail:detailReducer,
    events:eventsReducer
});
export default reducer;