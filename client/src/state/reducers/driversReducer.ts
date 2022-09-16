import { Driver } from "../../pages/Drivers";
import { ActionType } from "../action-types/overtake-type";
import { Action } from "../actions/overtake-action";

const initialState: Driver[] = [];

const reducer = (state: Driver[] = initialState, action: Action): Driver[] => {
  switch (action.type) {
    case ActionType.OVERTAKE:
      return action.drivers;
    default:
      return state;
  }
};


export default reducer;