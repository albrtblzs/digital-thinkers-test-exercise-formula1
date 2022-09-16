import {combineReducers} from 'redux';
import driversReducer from './driversReducer';


const reducers = combineReducers({
  drivers: driversReducer
});

export default reducers;


export type State = ReturnType<typeof reducers>;