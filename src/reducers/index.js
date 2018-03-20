import authReducer from './authentification/authReducer';
import navReducer from './navigation/mainNavReducer';
import mainScreenNavReducer from './navigation/mainScreenNavReducer';
import mainReducer from './mainContainer/mainReducer';
import bucketsScreenNavReducer from '../reducers/navigation/bucketsScreenNavReducer';
import dashboardScreenNavReducer from '../reducers/navigation/dashboardScreenNavReducer';
import myAccountScreenNavReducer from '../reducers/navigation/myAccountScreenNavReducer';
import filesReducer from '../reducers/mainContainer/Files/filesReducer';
import billingReducer from '../reducers/billing/billingReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

/**
 * Declaration of redux store with combining all reducers
 */
const reducers = {
    authReducer, 
    navReducer, 
    mainScreenNavReducer, 
    mainReducer, 
    bucketsScreenNavReducer,
    dashboardScreenNavReducer,
    myAccountScreenNavReducer,
    filesReducer,
    billingReducer
};

export const store = createStore(combineReducers({ ...reducers }), applyMiddleware(thunk));